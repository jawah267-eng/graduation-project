const express = require("express");
const router = express.Router();
const Authservice = require("../services/authService");
const controller = require("../controllers/fertilizingController");

router.get("/", Authservice.protect, controller.getFertilizingSchedule);

router.patch("/:userPlantId", Authservice.protect, controller.markAsFertilized);

module.exports = router;
