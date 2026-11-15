const { PayPalRequest } = require("../utils/paypal");

// Create PayPal Donation Order
const createOrder = async (req, res) => {
    try {
        const { donationType, amount } = req.body;

        let donationAmount;

        if (donationType === "adoption") {
            // As far as I've seen there is only one amount for Koalas, so I hardcoded it to be 50 AUD
            donationAmount = 50;
        } else if (donationType === "wishlist") {
            // Grab the total amount number from the wishlist cart
            donationAmount = Number(amount);
            // If number provided isn't a number or below 0, reject
            if (!Number.isFinite(donationAmount) || donationAmount <= 0) {
                return res.status(400).json({
                    message: "Invalid donation amount"
                });
            }
        } else {
            // Only allows endpoint to work when it is an adoption or a wishlist purchase
            return res.status(400).json({
                message: "Unsupported donation type"
            });
        }

        const order = await PayPalRequest("/v2/checkout/orders", "POST", {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "AUD",
                        // Round to a factor of 2
                        value: donationAmount.toFixed(2)
                    }
                }
            ]
        });

        return res.status(200).json({
            orderID: order.id
        });

    } catch (error) {
        console.error("PayPal create order error:", error);

        return res.status(500).json({
            message: "Unable to create PayPal order"
        });
    }
};

// Capture successful order details from PayPal
const captureOrder = async (req, res) => {
    try {
        const { orderID } = req.body;

        if (!orderID) {
            return res.status(400).json({
                message: "PayPal order ID is required"
            });
        }

        const capture = await PayPalRequest(
            `/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,
            "POST"
        );
        // Returns the payment status to be checked in the frontend.
        return res.status(200).json({
            status: capture.status,
            capture
        });

    } catch (error) {
        console.error("PayPal capture error:", error);

        return res.status(500).json({
            message: "Unable to capture PayPal payment"
        });
    }
};

module.exports = {
    createOrder,
    captureOrder
};
