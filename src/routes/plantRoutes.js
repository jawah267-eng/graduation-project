const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const controller = require("../controllers/plantController");
const { param, validationResult } = require("express-validator");
const {
  getPlantValidator,
  createPlantValidator,
  updatePlantValidator,
  deletePlantValidator,
} = require("../utils/validators/plantValidator");
// const auth = require("../middlewares/auth");
// const role = require("../middlewares/role");

const Authservice = require("../services/authService");

// varirties
router.get("/:plantId/varieties", controller.getVarietiesByPlant);
router.post(
  "/:id/varieties",
  Authservice.protect,
  Authservice.restrictTo("admin"),
  controller.createVariety,
);
router
  .route("/:plantId/varieties/:varietyId")
  .put(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    controller.updateSpecificCategory,
  )
  .delete(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    controller.deleteSpecificCategory,
  );

// plant
router.route("/").get(controller.getallplant).post(
  Authservice.protect, // للتاكد اذا مسجل او لا
  Authservice.restrictTo("admin"), //له دور المرشد
  upload.array("images", 5),
  createPlantValidator,
  controller.createPlant,
);
router.get(
  "/:id",
  getPlantValidator, // الخاصة بال validation
  controller.getplant,
);

router.put(
  "/:plantId",
  Authservice.protect,
  Authservice.restrictTo("admin"),
  updatePlantValidator,
  controller.updateCategory,
);

router.delete(
  "/:plantId",
  Authservice.protect,
  Authservice.restrictTo("admin"),
  deletePlantValidator,
  controller.deleteCategory,
);

// route لانشاء علاقة بين المرض والنبتة
router.post(
  "/:id/diseases",
  Authservice.protect,
  Authservice.restrictTo("admin"),
  controller.createDiseaseRelation,
);

router.get(
  "/:plantId/diseases",
  Authservice.protect,
  controller.getDiseasesByPlant,
);

router.delete(
  "/:plantId/diseases/:relationId",
  Authservice.protect,
  Authservice.restrictTo("admin"),
  controller.deleteDiseaseRelation,
);

module.exports = router;
