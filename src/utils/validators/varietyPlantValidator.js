const { param, check } = require("express-validator");
const validatormiddleware = require("../../middlewares/validatorMiddleware");

exports.createVarietiesPlantValidator = [
  param("id").isMongoId().withMessage("Invalid plant id format"),
  check("common_name")
    .notEmpty()
    .withMessage("Variety common name is required"),
  check("type")
    .isIn(["local", "imported"])
    .withMessage("Type must be local or imported"),
  validatormiddleware,
];
exports.updateVarietiesPlantValidator = [
  param("plantId").isMongoId().withMessage("Invalid plant id format"),
  param("varietyId").isMongoId().withMessage("Invalid variety id format"),
  validatormiddleware,
];
exports.deleteVarietiesPlantValidator = [
  param("plantId").isMongoId().withMessage("Invalid plant id format"),
  param("varietyId").isMongoId().withMessage("Invalid variety id format"),
  validatormiddleware,
];
exports.getVarietiesByPlantValidator = [
  param("plantId").isMongoId().withMessage("Invalid plant id format"),
  validatormiddleware,
];
