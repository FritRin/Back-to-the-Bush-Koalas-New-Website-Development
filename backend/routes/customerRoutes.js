const express = require("express");
const router = express.Router();

const customerControllers = require("../controllers/customerControllers");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retireve all customers - admin only
router.get("/", authenticateAdmin, customerControllers.getAllCustomers);

// Retrieve one customer by ID
router.get("/:id", authenticateAdmin, customerControllers.getCustomerById);

// Create a customer
router.post("/", customerControllers.createCustomer);

module.exports = router;