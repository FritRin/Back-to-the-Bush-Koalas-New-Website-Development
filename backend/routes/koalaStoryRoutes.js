const express = require("express");
const router = express.Router();

const koalaStoryControllers = require("../controllers/koalaStoryControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retireve all koala stories
router.get("/", koalaStoryControllers.getAllKoalaStories);

// Retrieve one story by ID
router.get("/:id", koalaStoryControllers.getKoalaStoryById);

// Create a story
router.post("/", authenticateAdmin, koalaStoryControllers.createKoalaStory);

//update a koala story
router.put("/:id", authenticateAdmin, koalaStoryControllers.updateKoalaStory);

// Delete a story
router.delete("/:id", authenticateAdmin, koalaStoryControllers.deleteKoalaStory);

module.exports = router;