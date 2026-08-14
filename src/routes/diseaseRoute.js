const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const controller = require("../controllers/diseaseController");
const Authservice = require("../services/authService");

// جلب الأمراض حسب نبتة المستخدم
router.get(
  "/userplant/:userPlantId",
  Authservice.protect, // لأن هذا خاص بـ "نباتاتي"، وما لازم زائر يشوف أمراض نبات شخص آخر.
  controller.getDiseasesByUserPlant,
);

// ارجاع كل الامراض
//اضافة مرض
router
  .route("/")
  .get(Authservice.protect, controller.getAllDiseases)

  .post(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    upload.single("image"),
    controller.createDisease,
  );
//ارجاع مرض معين
//تعديل مرض
//حذف مرض
router
  .route("/:id")
  .get(Authservice.protect, controller.getDisease)
  .put(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    controller.updateDisease,
  )

  .delete(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    controller.deleteDisease,
  );

module.exports = router;
