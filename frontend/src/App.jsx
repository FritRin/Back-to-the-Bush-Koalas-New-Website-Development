import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "AUD",
        intent: "capture",
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
