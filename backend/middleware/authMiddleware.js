const jwt = require("jsonwebtoken");

const COOKIE_NAME = "admin_token";

function authenticateAdmin(req, res, next) {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required, please sign in",
        });
    }

    if (!process.env.JWT_SECRET) {
        return next(new Error("JWT_SECRET is not configured"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            issuer: "btbk-api",
            audience: "btbk-admin",
        });

        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Session expired or is invalid, please sign in again."
        });
    }
}

module.exports = authenticateAdmin;