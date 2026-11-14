const express = require("express");
const router = express.Router();

const boxStoryControllers = require("../controllers/boxStoryControllers");

// retive all box stories
router.get("/", boxStoryControllers.getAllBox);

// retrive all box story by id
router.get("/:id", boxStoryControllers.getBoxById);

// create box story
router.post("/", boxStoryControllers.createBox);

// Update Box Story
router.put("/:id", boxStoryControllers.updateBox);

// delete box story
router.delete("/:id", boxStoryControllers.deleteBox);

module.exports = router;