const express = require("express");
const router = express.Router();

const wishlistItemControllers = require("../controllers/wishlistItemControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retireve all wishlist items
router.get("/", wishlistItemControllers.getAllWishlistItems);

// Retrieve one item
router.get("/:id", wishlistItemControllers.getWishlistItemById);

// Create a wishlist item
router.post("/", authenticateAdmin, wishlistItemControllers.createWishlistItem);

//update an item
router.put("/:id", authenticateAdmin, wishlistItemControllers.updateWishlistItem);

// Delete a wishlist item
router.delete("/:id", authenticateAdmin, wishlistItemControllers.deleteWishlistItem);

router.patch("/:id/decrement", wishlistItemControllers.decrementItem);

module.exports = router;