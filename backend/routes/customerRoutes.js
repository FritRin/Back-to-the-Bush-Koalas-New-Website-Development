const express = require("express");
const router = express.Router();

const customerControllers = require("../controllers/customerControllers");

// Retireve all customers
router.get("/", customerControllers.getAllCustomers);

// Retrieve one customer by ID
router.get("/:id", customerControllers.getCustomerById);

// Create a customer
router.post("/", customerControllers.createCustomer);

module.exports = router;