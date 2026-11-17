const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const COOKIE_NAME = "admin_token";
// session duration 1 hr
const SESSION_DURATION_MS = 60 * 60 * 1000;

// Max failed logins before locking
const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api",
  maxAge: SESSION_DURATION_MS,
};

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return process.env.JWT_SECRET;
}

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password ||
      email.trim().length > 255 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email and password",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // formate check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email and password",
      });
    }

    const admin = await Admin.findOne({
      where: { email: normalizedEmail },
    });

    // User same response for an unknown email or incorrect pw
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check whether the account is currently locked
    if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
      const remainingTime = Math.ceil(
        (new Date(admin.locked_until).getTime() - Date.now()) / 60000,
      );

      return res.status(423).json({
        success: false,
        message: `Too many failed login attempts, your accounts has been locked for ${remainingTime} minute${remainingTime === 1 ? "" : "s"}.`,
      });
    }

    // Reset expired lockouts
    if (admin.locked_until && new Date(admin.locked_until) <= new Date()) {
      await admin.update({
        failed_login_attempts: 0,
        locked_until: null,
      });
    }

    const passwordMatches = await bcrypt.compare(password, admin.password_hash);

    // Record failed login attempts
    if (!passwordMatches) {
      await admin.increment("failed_login_attempts");
      await admin.reload();

      // Lock the account after too many failed attempts
      if (admin.failed_login_attempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
        await admin.update({
          locked_until: new Date(Date.now() + LOCKOUT_DURATION_MS),
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Reset failed attempts after successful login
    await admin.update({
      failed_login_attempts: 0,
      locked_until: null,
    });

    const token = jwt.sign({ adminId: admin.admin_id }, getJwtSecret(), {
      expiresIn: "1h",
      issuer: "btbk-api",
      audience: "btbk-admin",
    });

    res.cookie(COOKIE_NAME, token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login Successful.",
      admin: {
        admin_id: admin.admin_id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
exports.getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.adminId, {
      attributes: ["admin_id", "first_name", "last_name", "email"],
    });

    if (!admin) {
      res.clearCookie(COOKIE_NAME, cookieOptions);
      return res.status(401).json({
        success: false,
        message: "Admin account not found, please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
