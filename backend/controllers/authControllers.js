const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const COOKIE_NAME = "admin_token";
// session duration 1 hr
const SESSION_DURATION_MS = 60 * 60 * 1000; 

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
            return res.status(400).json ({
                success: false,
                message: "Please enter a valid email and password"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // formate check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json ({
                success: false,
                message: "Please enter a valid email and password"
            });
        }

        const admin = await Admin.findOne({
            where: { email: normalizedEmail },
        });

        // User same response for an unknown email or incorrect pw
        if (!admin) {
            return res.status(401).json ({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            admin.password_hash
        );

        if (!passwordMatches) {
            return res.status(401).json ({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { adminId: admin.admin_id },
            getJwtSecret(),
            {
                expiresIn: "1h",
                issuer: "btbk-api",
                audience: "btbk-admin",
            }
        );

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
        message: "Logout successful"
    })
}