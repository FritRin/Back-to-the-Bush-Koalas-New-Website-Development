const express = require("express");
const router = express.Router();

const adoptionControllers = require("../controllers/adoptionControllers");

// Retireve all adoptions
router.get("/", adoptionControllers.getAllAdoptions);

// Retrieve one customer by ID
router.get("/:id", adoptionControllers.getAdoptionById);

// Create a customer
router.post("/", adoptionControllers.createAdoption);

module.exports = router;