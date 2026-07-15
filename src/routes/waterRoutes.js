const express = require("express");
const router = express.Router();
const controller = require("../controllers/waterController");

router.patch("/:userPlantId", controller.markAsWatered);

module.exports = router;
