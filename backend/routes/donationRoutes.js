const express = require("express");
const router = express.Router();

const donationControllers = require("../controllers/donationControllers");

// Retireve all donations
router.get("/", donationControllers.getAllDonations);

// Retrieve one donation
router.get("/:id", donationControllers.getDonationById);

// Create a donation
router.post("/", donationControllers.createDonation);

module.exports = router;