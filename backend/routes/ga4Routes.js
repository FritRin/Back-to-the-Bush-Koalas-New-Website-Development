
const express = require("express");
const router = express.Router();

const ga4Controller = require("../controllers/ga4Controller");
const authenticateAdmin = require("../middleware/authMiddleware");

// Retrieve website traffic analytics - admin only
router.get("/traffic", authenticateAdmin, ga4Controller.getWebsiteTraffic);

router.get("/sources", authenticateAdmin, ga4Controller.getTrafficSources);

router.get("/devices", authenticateAdmin, ga4Controller.getVisitorDevices);

router.get("/engagement", authenticateAdmin, ga4Controller.getUserEngagement);

module.exports = router;
