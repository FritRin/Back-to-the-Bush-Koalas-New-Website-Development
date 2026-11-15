import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalAdoptWishlist = ({ donationType, amount, onPaymentSuccess }) => {
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
                amount
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
        setPaymentMessage("Processing...");

        const response = await fetch("/api/paypal/capture", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        });

        const result = await response.json();

        if (!response.ok || result.status !== "COMPLETED") {
            throw new Error("Payment failed.");
        }

        onPaymentSuccess();
    };
    // Show PayPal payment modal, with the cost being pre-filled from the respective chosen koala / items in cart.
    return (
        <div className="mt-6">
            <div className="mb-4 text-center">
                <p className="text-gray-600">
                    {donationType === "adoption"
                        ? "Adoption Cost"
                        : "Total Amount"}
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
                    onError={(error) => {
                        console.error("PayPal error:", error);
                        setPaymentMessage(
                            "Something went wrong with PayPal. Please try again."
                        );
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
