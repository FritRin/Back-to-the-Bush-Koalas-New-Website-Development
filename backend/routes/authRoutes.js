const express = require("express");
const router = express.Router();
const { rateLimit } = require("express-rate-limit");

const authControllers = require("../controllers/authControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

// Login rate limit: 5 attempts per 15 mins
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Try again later",
    },
});

router.post("/login", loginLimiter, authControllers.login);
router.get("/me", authenticateAdmin, authControllers.getCurrentAdmin);
router.post("/logout", authControllers.logout);

module.exports = router;