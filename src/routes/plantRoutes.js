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
/*
 */
// varirties
router.get("/:plantId/varieties", controller.getVarietiesByPlant);
router.post("/:id/varieties", controller.createVariety);
router
  .route("/:plantId/varieties/:varietyId")
  .put(controller.updateSpecificCategory)
  .delete(controller.deleteSpecificCategory);

// plant
router.route("/").get(controller.getallplant).post(
  // auth, // لتاكد انه مسجل دخول
  // role("advisor"), //له دور المرشد
  upload.array("images", 5),
  createPlantValidator,
  controller.createPlant,
);
router.get(
  "/:id",
  getPlantValidator, // الخاصة بال validation
  controller.getplant,
);

router.put("/:plantId", updatePlantValidator, controller.updateCategory);
router.delete("/:plantId", deletePlantValidator, controller.deleteCategory);

module.exports = router;
