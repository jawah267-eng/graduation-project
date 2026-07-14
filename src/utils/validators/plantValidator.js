const { param, check } = require("express-validator");
const validatormiddleware = require("../../middlewares/validatorMiddleware");

exports.getPlantValidator = [
  check("id").isMongoId().withMessage("invalid plant id format"),
  validatormiddleware,
];
exports.createPlantValidator = [
  check("common_name").notEmpty().withMessage("plants required"),
  validatormiddleware,
];
exports.updatePlantValidator = [
  check("plantId").isMongoId().withMessage("invalid plant id format"),
  validatormiddleware,
];
exports.deletePlantValidator = [
  check("plantId").isMongoId().withMessage("invalid plant id format"),
  validatormiddleware,
];
