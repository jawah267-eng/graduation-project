const express = require("express");
const router = express.Router();

const soilController = require("../controllers/soilController");

router.get("/:plantId/soils", soilController.getSoilsByPlant);

module.exports = router;
