const express = require("express");
const router = express.Router();

const controller = require("../controllers/diseaseController");

// جلب الأمراض حسب نبتة المستخدم
router.get("/userplant/:userPlantId", controller.getDiseasesByUserPlant);

module.exports = router;
