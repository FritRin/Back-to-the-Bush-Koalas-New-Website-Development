const express = require("express");
const router = express.Router();
const authenticateAdmin = require("../middleware/authMiddleware");

const boxStoryControllers = require("../controllers/boxStoryControllers");

// retive all box stories
router.get("/", authenticateAdmin, boxStoryControllers.getAllBox);

// retrive all box story by id
router.get("/:id", authenticateAdmin, boxStoryControllers.getBoxById);

// create box story
router.post("/", authenticateAdmin, boxStoryControllers.createBox);

// Update Box Story
router.put("/:id", authenticateAdmin, boxStoryControllers.updateBox);

// delete box story
router.delete("/:id", authenticateAdmin, boxStoryControllers.deleteBox);

module.exports = router;