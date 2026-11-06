const express = require("express");
const router = express.Router();

const wishlistItemControllers = require("../controllers/wishlistItemControllers");

// Retireve all wishlist items
router.get("/", wishlistItemControllers.getAllWishlistItems);

// Retrieve one item
router.get("/:id", wishlistItemControllers.getWishlistItemById);

// Create a wishlist item
router.post("/", wishlistItemControllers.createWishlistItem);

//update an item
router.put("/:id", wishlistItemControllers.updateWishlistItem);

// Delete a wishlist item
router.delete("/:id", wishlistItemControllers.deleteWishlistItem);

module.exports = router;