const express = require("express");
const router = express.Router();

const controller = require("../controllers/fertilizingController");

router.get("/", controller.getFertilizingSchedule);

router.patch("/:userPlantId", controller.markAsFertilized);

module.exports = router;
