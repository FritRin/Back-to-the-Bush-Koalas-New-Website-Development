const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const COOKIE_NAME = "admin_token";

async function authenticateAdmin(req, res, next) {
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

    if (!decoded.adminId) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin session",
      });
    }

    const admin = await Admin.findByPk(decoded.adminId, {
      attributes: ["admin_id", "first_name", "last_name", "email"],
    });

    if (!admin) {
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api",
      });

      return res.status(401).json({
        success: false,
        message: "Admin account does not exist, please try again.",
      });
    }

    req.adminId = admin.admin_id;
    req.admin = admin;

    return next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Session have expired or is invalid, sign in again.",
      });
    }
    return next(error);
  }
}
module.exports = authenticateAdmin;
