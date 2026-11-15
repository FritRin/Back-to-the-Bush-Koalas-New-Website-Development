const express = require("express");
const router = express.Router();

const paypalControllers = require("../controllers/paypalControllers");

// Create PayPal Donation Order
router.post("/create", paypalControllers.createOrder);

// Capture successful order details from PayPal
router.post("/capture" , paypalControllers.captureOrder);

module.exports = router;