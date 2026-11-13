const express = require("express");
const router = express.Router();

const donationControllers = require("../controllers/donationControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retireve all donations - admin only
router.get("/", authenticateAdmin, donationControllers.getAllDonations);

// Retrieve one donation - admin only
router.get("/:id", authenticateAdmin, donationControllers.getDonationById);

// Create a donation
router.post("/", donationControllers.createDonation);

module.exports = router;