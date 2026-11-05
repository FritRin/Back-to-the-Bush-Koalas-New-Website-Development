const express = require("express");
const router = express.Router();

const koalaStoryControllers = require("../controllers/koalaStoryControllers");

// Retireve all koala stories
router.get("/", koalaStoryControllers.getAllKoalaStories);

// Retrieve one story by ID
router.get("/:id", koalaStoryControllers.getKoalaStoryById);

// Create a story
router.post("/", koalaStoryControllers.createKoalaStory);

//update a koala story
router.put("/:id", koalaStoryControllers.updateKoalaStory);

// Delete a story
router.delete("/:id", koalaStoryControllers.deleteKoalaStory);

module.exports = router;