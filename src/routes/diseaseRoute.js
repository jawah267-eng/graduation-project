const express = require("express");
const router = express.Router();

const controller = require("../controllers/diseaseController");

// جلب الأمراض حسب نبتة المستخدم
router.get("/userplant/:userPlantId", controller.getDiseasesByUserPlant);

// ارجاع كل الامراض
//اضافة مرض
router
  .route("/")
  .get(controller.getAllDiseases)
  .post(upload.single("image"), controller.createDisease);
//ارجاع مرض معين
//تعديل مرض
//حذف مرض
router
  .route("/:id")
  .get(controller.getDisease)
  .put(controller.updateDisease)
  .delete(controller.deleteDisease);

module.exports = router;
