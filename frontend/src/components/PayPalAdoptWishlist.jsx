// Document was named PayPalAdoptWishlist as I originally have separate ones for adoptions/wishlist and regular donation, but I ended up combining them together. The name will remain the same.
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalAdoptWishlist = ({ donationType, amount, koalaId, cartItems = [], customerDetails, onPaymentSuccess }) => {
    const [ paymentMessage, setPaymentMessage ] = useState("");
    // Request API to create new order.
    const createOrder = async () => {
        const response = await fetch("/api/paypal/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                donationType,
                amount,
                koalaId,
                cartItems: donationType === "wishlist"
                    ? cartItems.map((item) => ({
                        item_id: item.item_id,
                        quantity: 1
                    }))
                    : undefined
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not create PayPal order");
        }

        return data.orderID;
    };
    // Capture order request and if succesful then show success message on FormPopUp, if failed then show error.
    const onApprove = async (data) => {
        try {
            // Payment pending message before anything is done.
            setPaymentMessage("Processing payment...");

            const response = await fetch("/api/paypal/capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                    customer: customerDetails,
                    cartItems: donationType === "wishlist"
                    ? cartItems.map((item) => ({
                        item_id: item.item_id,
                        quantity: 1
                    }))
                    : undefined
                })
            });

            const result = await response.json();
            // If payment is declined, shows the error message and let user try again by clicking the button again.
            if (!response.ok) {
                if (result.code === "INSTRUMENT_DECLINED") {
                    setPaymentMessage(
                        "Your payment was declined. Please try another payment method."
                    );
                }

                throw new Error(
                    result.message || "Payment could not be completed."
                );
            }

            if (result.status !== "COMPLETED") {
                throw new Error(
                    result.message || "Payment could not be completed."
                );
            }

            onPaymentSuccess();

        } catch (error) {
            console.error("Payment approval error:", error);

            setPaymentMessage(
                error.message || "Something went wrong. Please try again."
            );
        }
    };
    // Show PayPal payment modal, with the cost being pre-filled from the respective chosen koala / items in cart.
    return (
        <div className="mt-6">
            <div className="mb-4 text-center">
                <p className="text-gray-600">
                    {donationType === "adoption" ? "Adoption Cost" : "Donation Amount"}
                </p>
                <p className="text-2xl font-bold">
                    A${Number(amount).toFixed(2)}
                </p>
            </div>

            <PayPalScriptProvider
                options={{
                    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "AUD",
                    intent: "capture"
                }}
            >
                <PayPalButtons
                    style={{
                        layout: "vertical",
                        shape: "rect",
                        label: "paypal"
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    // Error handling for when user closes their PayPal window without paying.
                    onCancel={() => {
                        setPaymentMessage("No payment was made as it was cancelled.");
                    }}
                    onError={(error) => {
                        console.error("PayPal error:", error);
                        setPaymentMessage("Something went wrong with PayPal. Please try again.");
                    }}
                />
            </PayPalScriptProvider>

            {paymentMessage && (
                <p className="mt-3 text-center">
                    {paymentMessage}
                </p>
            )}
        </div>
    );
};

export default PayPalAdoptWishlist;
