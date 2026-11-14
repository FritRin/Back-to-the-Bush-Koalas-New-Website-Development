const express = require("express");
const router = express.Router();

const koalaStoryControllers = require("../controllers/koalaStoryControllers");
const upload = require("../middleware/upload");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retrieve all koala stories
router.get("/", koalaStoryControllers.getAllKoalaStories);

// Retrieve one story by ID
router.get("/:id", koalaStoryControllers.getKoalaStoryById);

// Create a story (authenticated + image upload)
router.post(
    "/",
    authenticateAdmin,
    upload.array("images", 10),
    koalaStoryControllers.createKoalaStory
);

// Add single image to a story
router.post(
    "/:id/images",
    authenticateAdmin,
    upload.single("image"),
    koalaStoryControllers.addStoryImage
);

// Update a story
router.put("/:id", authenticateAdmin, koalaStoryControllers.updateKoalaStory);

// Replace a specific image
router.patch(
    "/:id/images/:index",
    authenticateAdmin,
    upload.single("image"),
    koalaStoryControllers.updateStoryImage
);

// Delete a specific image
router.delete(
    "/:id/images/:index",
    authenticateAdmin,
    koalaStoryControllers.deleteStoryImage
);

// Delete a story
router.delete("/:id", authenticateAdmin, koalaStoryControllers.deleteKoalaStory);

module.exports = router;