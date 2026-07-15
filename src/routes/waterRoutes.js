const express = require("express");
const router = express.Router();
const controller = require("../controllers/waterController");

// PATCH لأننا عم "نحدث" سجل موجود، مش ننشئ جديد
// الـ userPlantId جاي من الـ URL params
router.patch("/:userPlantId", controller.markAsWatered);

module.exports = router;
