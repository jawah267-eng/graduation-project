const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const controller = require("../controllers/plantController");
const { param, validationResult } = require("express-validator");
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
  controller.createPlant,
);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("invalid plant id"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  controller.getplant,
);

router.put("/:plantId", controller.updateCategory);
router.delete("/:plantId", controller.deleteCategory);

module.exports = router;
