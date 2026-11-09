const express = require("express");
const router = express.Router();

const koalaControllers = require("../controllers/koalaControllers");
const upload = require("../middleware/upload");


// Retireve all koalas
router.get("/", koalaControllers.getAllKoalas);

// Retrieve one koala by ID
router.get("/:id", koalaControllers.getKoalaById);

// Create a koala
router.post("/",upload.array("images"),koalaControllers.createKoala);

//update a koala
router.put("/:id", upload.array("images"), koalaControllers.updateKoala);

// Delete a koala
router.delete("/:id", koalaControllers.deleteKoala);

module.exports = router;