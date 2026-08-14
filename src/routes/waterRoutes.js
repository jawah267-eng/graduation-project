const express = require("express");
const router = express.Router();
const controller = require("../controllers/waterController");
const Authservice = require("../services/authService");

//GET /api/v1/water
router.get("/", Authservice.protect, controller.getWaterSchedule);
// PATCH لأننا عم "نحدث" سجل موجود، مش ننشئ جديد
// الـ userPlantId جاي من الـ URL params
router.patch("/:userPlantId", Authservice.protect, controller.markAsWatered);

module.exports = router;
