const express = require("express");
const router = express.Router();

const userPlantController = require("../controllers/userplantcontroller");

router.post("/", userPlantController.createUserPlant);

module.exports = router;
