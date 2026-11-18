const { PayPalRequest } = require("../utils/paypal");
const sequelize = require("../utils/database");
const Customer = require("../models/Customer");
const Donation = require("../models/Donation");
const Adoption = require("../models/Adoption");
const Koala = require("../models/Koala");
const WishlistItem = require("../models/WishlistItem");
const WishlistPurchase = require("../models/WishlistPurchase");
const { Op } = require("sequelize");

// Create PayPal Donation Order
const createOrder = async (req, res) => {
    try {
        const { donationType, amount, koalaId, cartItems } = req.body;

        let donationAmount;
        // If it is an adoption, then requires the koala ID to be recorded later.
        if (donationType === "adoption") {
            if (!koalaId) {
                return res.status(400).json({
                    message: "Koala ID is required for adoption"
                });
            }

            const koala = await Koala.findByPk(koalaId);

            if (!koala) {
                return res.status(404).json({
                    message: "Koala not found"
                });
            }
            // Set donation amount to 50 dollars for adoptions as that is the default (and only) amount that is set.
            donationAmount = 50;

        } else if (donationType === "general") {
            donationAmount = Number(amount);

            if (!Number.isFinite(donationAmount) || donationAmount <= 0) {
                return res.status(400).json({
                    message: "Invalid donation amount"
                });
            }

        } else if (donationType === "wishlist") {
            // Validate if there are items in the cart.
            if (!Array.isArray(cartItems) || cartItems.length === 0) {
                return res.status(400).json({
                    message: "Your wishlist cart is empty"
                });
            }

        // Validate item IDs and quantities.
        const quantities = new Map();

        for (const item of cartItems) {
            if (
                typeof item.item_id !== "string" ||
                !item.item_id.trim() ||
                item.quantity !== 1
            ) {
                return res.status(400).json({
                    message: "Invalid wishlist cart item"
                });
            }

            const id = item.item_id.trim();
            // Check if two of the same items are being bought (frontend currently doesn't allow multiple quantities so this is more for safety)
            if (quantities.has(id)) {
                return res.status(400).json({
                    message: "Duplicate item added to cart"
                });
            }

            quantities.set(id, 1);
        }

            // Retrieve actual items and prices from database instead of relying on frontend's data (as it can be tampered with).
            const wishlistItems = await WishlistItem.findAll({
                where: {
                    item_id: {
                        [Op.in]: [...quantities.keys()]
                    }
                }
            });

            if (wishlistItems.length !== quantities.size) {
                return res.status(400).json({
                    message: "One or more wishlist items could not be found"
                });
            }

            // Calculate total using the price from the database, not the frontend.
            let totalCents = 0;

            for (const item of wishlistItems) {
                const quantity = quantities.get(item.item_id);

                if (item.status !== "A" || item.number_of_items < quantity) {
                    return res.status(400).json({
                        message: `The item ${item.item_name} is unavailable or has insufficient stock`
                    });
                }
                // Convert dollars to cents for easier and more accurate calculations.
                const priceCents = Math.round(Number(item.price) * 100);

                if (!Number.isSafeInteger(priceCents) || priceCents < 0) {
                    return res.status(400).json({
                        message: "Invalid wishlist item price"
                    });
                }

                totalCents += priceCents * quantity;
            }

            donationAmount = totalCents / 100;
            // Ensuring that the final amount is a positive number in cents.
            if (!Number.isSafeInteger(totalCents) || totalCents <= 0) {
                return res.status(400).json({
                    message: "Invalid wishlist total"
                });
            }

        } else {
            return res.status(400).json({
                message: "Unsupported donation type"
            });
        }

        const order = await PayPalRequest("/v2/checkout/orders", "POST", {
            intent: "CAPTURE",
            purchase_units: [
                {
                    custom_id: donationType === "adoption"
                        ? `adoption:${koalaId}`
                        : donationType,
                    amount: {
                        currency_code: "AUD",
                        // Round to 2 decimal places.
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

// Capture successful order details from PayPal.
const captureOrder = async (req, res) => {
    try {
        const { orderID, customer } = req.body;

        if (!orderID || !customer || typeof customer.email !== "string" ||!customer.email.trim()) {
            return res.status(400).json({
                message: "Order ID and customer email are required"
            });
        }
        // Capture API request.
        const capture = await PayPalRequest(
            `/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,
            "POST",
        );

        if (capture.status !== "COMPLETED") {
            return res.status(200).json({
                status: capture.status,
                message: "Payment has not been completed"
            });
        }
        // Get the purchase and its captured payment details.
        const purchaseUnit = capture.purchase_units?.[0];
        const paymentCapture = purchaseUnit?.payments?.captures?.[0];

        if (!paymentCapture || paymentCapture.status !== "COMPLETED") {
            return res.status(400).json({
                message: "Unable to verify payment."
            });
        }
        // Retrieve purchase type and koalaId from the customId.
        const customId = paymentCapture.custom_id;
        const [purchaseType, koalaId] = (customId || "").split(":");

        if (!["adoption", "general", "wishlist"].includes(purchaseType)) {
            return res.status(400).json({
                message: "Invalid purchase type"
            });
        }
        // Get the transaction reference number, actual amount that was paid and its currency via PayPal to be recorded in database.
        const transactionReference = paymentCapture.id;
        const amount = paymentCapture.amount.value;
        const currency = paymentCapture.amount.currency_code;

        const result = await sequelize.transaction(async (transaction) => {
            // Check if the captured purchase is already recorded and return if it is, so there won't be duplicate.
            const existingRecord = purchaseType === "adoption"
                ? await Adoption.findOne({
                    where: { transaction_reference: transactionReference },
                    transaction
                })
                : purchaseType === "wishlist"
                    ? await WishlistPurchase.findOne({
                        where: { transaction_reference: transactionReference },
                        transaction
                    })
                    : await Donation.findOne({
                        where: { transaction_reference: transactionReference },
                        transaction
                    });

            if (existingRecord) {
                return {
                    record: existingRecord,
                    recordType: purchaseType
                };
            }

            // Validate the payment amount and currency (PayPal will handle any conversions on their end, just need to ensure our database is in AUD for simplicity sake).
            if (currency !== "AUD") {
                throw new Error("Unexpected payment currency");
            }
            // If email already exists then grab the existing customer's id for the record, if not then create a new customer and grab the new id.
            const email = customer.email.trim().toLowerCase();

            let existingCustomer = await Customer.findOne({
                where: { email },
                transaction
            });
            // Customer data from the form.
            const customerData = {
                first_name: customer.first_name,
                last_name: customer.last_name,
                email,
                phone: customer.phone,
                street_number: customer.street_number,
                street_name: customer.street_name,
                suburb: customer.suburb,
                postcode: customer.postcode,
                country: customer.country,
                company_name: customer.company_name || null
            };

            if (existingCustomer) {
                await existingCustomer.update(
                    customerData, 
                    { transaction }
                );
            } else {
                existingCustomer = await Customer.create(
                    customerData,
                    { transaction }
                );
            }

            if (purchaseType === "wishlist") {
                const { cartItems } = req.body;

                if (!Array.isArray(cartItems) || cartItems.length === 0) {
                    throw new Error("Wishlist cart is empty");
                }

                // Validate and combine duplicate item IDs.
                const quantities = new Map();

                for (const item of cartItems) {
                    if (
                        typeof item.item_id !== "string" ||
                        !item.item_id.trim() ||
                        !Number.isInteger(item.quantity) ||
                        item.quantity < 1
                    ) {
                        throw new Error("Invalid wishlist cart item");
                    }

                    const id = item.item_id.trim();

                    quantities.set(
                        id,
                        (quantities.get(id) || 0) + item.quantity
                    );
                }

                // Lock the inventory rows while processing this purchase, ensuring that no items can be removed or added during processing.
                const wishlistItems = await WishlistItem.findAll({
                    where: {
                        item_id: {
                            [Op.in]: [...quantities.keys()]
                        }
                    },
                    transaction,
                    lock: transaction.LOCK.UPDATE
                });

                if (wishlistItems.length !== quantities.size) {
                    throw new Error("One or more wishlist items could not be found");
                }

                // Recalculate the total using actual prices from database.
                let totalCents = 0;

                for (const item of wishlistItems) {
                    const quantity = quantities.get(item.item_id);

                    if (item.status !== "A" || item.number_of_items < quantity) {
                        throw new Error(`${item.item_name} is unavailable or has insufficient stock`);
                    }

                    const priceCents = Math.round(Number(item.price) * 100);
                    totalCents += priceCents * quantity;
                }

                // Check the calculated database total amount against the actual PayPal capture.
                if (totalCents !== Math.round(Number(amount) * 100)) {
                    throw new Error("Wishlist total does not match the captured payment");
                }

                // Create one purchase record per wishlist item.
                const purchases = [];

                for (const item of wishlistItems) {
                    const quantity = quantities.get(item.item_id);

                    const purchase = await WishlistPurchase.create({
                        customer_id: existingCustomer.customer_id,
                        item_id: item.item_id,
                        purchase_quantity: quantity,
                        purchase_price: item.price,
                        payment_method: "PayPal",
                        transaction_reference: transactionReference
                    }, { transaction });

                    purchases.push(purchase);

                    // Reduce available stock.
                    const remainingStock = item.number_of_items - quantity;

                    await item.update({
                        number_of_items: remainingStock,
                        // Set to "I" (Unavailable) when its out of stock, hiding the item from the page.
                        status: remainingStock === 0 ? "I" : "A"
                    }, { transaction });
                }

                return {
                    record: purchases[0],
                    recordType: "wishlist",
                    recordIDs: purchases.map((purchase) => purchase.purchase_id)
                };
            }

            // Adoption must be 50 AUD or otherwise reject (prevent tampering if user somehow managed to make PayPal charge less for example).
            if (purchaseType === "adoption" && Number(amount) !== 50) {
                throw new Error("Invalid adoption payment amount");
            }
            
            // Save into adoption table for adoptions.
            if (purchaseType === "adoption") {

                const koala = await Koala.findByPk(koalaId, {
                    transaction
                });

                if (!koala) {
                    throw new Error("Koala not found");
                }

                const adoption = await Adoption.create({
                    customer_id: existingCustomer.customer_id,
                    koala_id: koalaId,
                    status: "Adopted",
                    amount,
                    payment_method: "PayPal",
                    transaction_reference: transactionReference
                }, { transaction }
            );
                return {
                    record: adoption,
                    recordType: "adoption"
                };
            }
            // For general donation (and wishlist for the time being), it will be saved in the regular donations table.
            const donation = await Donation.create({
                customer_id: existingCustomer.customer_id,
                currency,
                amount,
                payment_method: "PayPal",
                transaction_reference: transactionReference
            }, { transaction }
        );

            return {
                record: donation,
                recordType: purchaseType
            };
        });

        return res.status(200).json({
            status: "COMPLETED",
            message: "Payment successfully recorded",
            recordType: result.recordType,
            // Either adoption or donation id depending on if user is adopting or donating.
            recordID: result.record.adoption_id || result.record.donation_id || result.record.purchase_id,
            recordIDs: result.recordIDs || undefined
        });

    } catch (error) {
        console.error("PayPal capture error:", error);
        // Error handling for if payment is declined or any other error occuring during payment.
        if (error.paypalIssue === "INSTRUMENT_DECLINED") {
            return res.status(422).json({
                code: "INSTRUMENT_DECLINED",
                message: "Your payment method was declined. Please try another payment method.",
                debugId: error.paypalDebugId
            });
        }
        return res.status(500).json({
            code: "PAYMENT_ERROR",
            message: "We couldn't process your payment. Please try again."
        });
    }
};

module.exports = {
    createOrder,
    captureOrder
};
