const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const controller = require("../controllers/plantController");
// const auth = require("../middlewares/auth");
// const role = require("../middlewares/role");
/*

*/
router.get("/:plantId/varieties", controller.getVarietiesByPlant);
router.get("/:id", controller.getplant);
router.post("/:id/varieties", controller.createVariety);
router
  .route("/:plantId/varieties/:varietyId")
  .put(controller.updateSpecificCategory)
  .delete(controller.deleteSpecificCategory);

router.route("/").get(controller.getallplant).post(
  // auth, // لتاكد انه مسجل دخول
  // role("advisor"), //له دور المرشد
  upload.array("images", 5),
  controller.createPlant,
);

router.put("/:plantId", controller.updateCategory);
router.delete("/:plantId", controller.deleteCategory);

module.exports = router;
