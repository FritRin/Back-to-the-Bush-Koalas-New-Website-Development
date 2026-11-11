const express = require("express");
const router = express.Router();

const koalaControllers = require("../controllers/koalaControllers");
const upload = require("../middleware/upload");
const authenticateAdmin = require("../middleware/authMiddleware");


// Retireve all koalas
router.get("/", koalaControllers.getAllKoalas);

// Retrieve one koala by ID
router.get("/:id", koalaControllers.getKoalaById);

// Create a koala
router.post("/", authenticateAdmin, upload.array("images"), koalaControllers.createKoala);

//update a koala
router.put("/:id", authenticateAdmin, upload.array("images"), koalaControllers.updateKoala);

// Delete a koala
router.delete("/:id", authenticateAdmin, koalaControllers.deleteKoala);

module.exports = router;