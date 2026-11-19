const express = require("express");
const router = express.Router();

const wishlistPurchaseControllers = require("../controllers/wishlistPurchaseControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retireve all wishlist purchases - admin only
router.get("/", authenticateAdmin, wishlistPurchaseControllers.getAllWishlistPurchases);

// Retrieve one wishlist purchase by ID - admin only
router.get("/:id", authenticateAdmin, wishlistPurchaseControllers.getWishlistPurchaseById);

module.exports = router;