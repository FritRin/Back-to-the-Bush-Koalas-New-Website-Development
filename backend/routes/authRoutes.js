const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

router.post("/login", authControllers.login);
router.get("/me", authenticateAdmin, authControllers.getCurrentAdmin);
router.post("/logout", authControllers.logout);

module.exports = router;