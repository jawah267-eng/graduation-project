const express = require("express");
const router = express.Router();

const userPlantController = require("../controllers/userPlantController");

router.post("/", userPlantController.createUserPlant);

module.exports = router;
