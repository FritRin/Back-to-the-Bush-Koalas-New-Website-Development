const express = require("express");
const router = express.Router();

const koalaStoryControllers = require("../controllers/koalaStoryControllers");
const upload = require("../middleware/upload");

// Retireve all koala stories
router.get("/", koalaStoryControllers.getAllKoalaStories);

// Retrieve one story by ID
router.get("/:id", koalaStoryControllers.getKoalaStoryById);

// Create a story
router.post("/", upload.array("images", 10), koalaStoryControllers.createKoalaStory);

// create image
router.post( "/:id/images", upload.single("image"), koalaStoryControllers.addStoryImage);

// Update a story
router.put("/:id",koalaStoryControllers.updateKoalaStory);

// Remplace a specific images
router.patch("/:id/images/:index", upload.single("image"), koalaStoryControllers.updateStoryImage );

// delete specific Image
router.delete("/:id/images/:index", koalaStoryControllers.deleteStoryImage);

// Delete a story
router.delete("/:id", koalaStoryControllers.deleteKoalaStory);

module.exports = router;