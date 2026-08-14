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
router.post("/:id/varieties", controller.createVariety);
router
  .route("/:plantId/varieties/:varietyId")
  .put(controller.updateSpecificCategory)
  .delete(controller.deleteSpecificCategory);

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
router.post("/:id/diseases", controller.createDiseaseRelation);

router.get("/:plantId/diseases", controller.getDiseasesByPlant);

router.delete(
  "/:plantId/diseases/:relationId",
  controller.deleteDiseaseRelation,
);

module.exports = router;
