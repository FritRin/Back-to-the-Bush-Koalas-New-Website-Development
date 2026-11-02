const express = require("express");
const router = express.Router();

const koalaControllers = require("../controllers/koalaControllers");

// Retireve all koalas
router.get("/", koalaControllers.getAllKoalas);

// Retrieve one koala by ID
router.get("/:id", koalaControllers.getKoalaById);

module.exports = router;