const baseURL = process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";
// Retrieve an OAuth Access Token using the clientID and Secret from .env.paypal to be able to utilise its service.
const PayPalAccessToken = async () => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Missing PayPal credentials");
    }

    const auth = Buffer.from( `${clientId}:${clientSecret}` ).toString("base64");

    const response = await fetch(
        `${baseURL}/v1/oauth2/token`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("Authentication with PayPal failed:", data);
        throw new Error("Failed to authenticate with PayPal");
    }

    return data.access_token;
};
// Use that token as authorisation for any PayPal requests.
const PayPalRequest = async (endpoint, method = "GET", body = null) => {
    const accessToken = await PayPalAccessToken();

    const response = await fetch(
        `${baseURL}${endpoint}`,
        {
            method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            ...(body && { body: JSON.stringify(body) }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("PayPal API error:", data);

        const error = new Error(data.message || "PayPal request failed");

        error.paypalIssue = data.details?.[0]?.issue;
        error.paypalDebugId = data.debug_id;
        error.status = response.status;

        throw error;
    }

    return data;
};

module.exports = {
    PayPalAccessToken,
    PayPalRequest,
};