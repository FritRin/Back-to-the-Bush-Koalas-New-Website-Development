const express = require("express");
const router = express.Router();

const adoptionControllers = require("../controllers/adoptionControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retireve all adoptions - admin only
router.get("/", authenticateAdmin, adoptionControllers.getAllAdoptions);

// Retrieve one customer by ID - admin only
router.get("/:id", authenticateAdmin, adoptionControllers.getAdoptionById);

// Create a customer
router.post("/", adoptionControllers.createAdoption);

module.exports = router;