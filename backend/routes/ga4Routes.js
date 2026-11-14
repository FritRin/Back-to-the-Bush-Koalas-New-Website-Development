
const express = require("express");
const router = express.Router();

const ga4Controller = require("../controllers/ga4Controller");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retrieve website traffic analytics - admin only
router.get("/traffic", authenticateAdmin, ga4Controller.getWebsiteTraffic);

module.exports = router;
