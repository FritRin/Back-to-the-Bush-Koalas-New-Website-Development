const express = require("express");
const router = express.Router();

const koalaControllers = require("../controllers/koalaControllers");

// Retireve all koalas
router.get("/", koalaControllers.getAllKoalas);

// Retrieve one koala by ID
router.get("/:id", koalaControllers.getKoalaById);

// Create a koala
router.post("/", koalaControllers.createKoala);

//update a koala
router.put("/:id", koalaControllers.updateKoala);

// Delete a koala
router.delete("/:id", koalaControllers.deleteKoala);

module.exports = router;