const slugify = require("slugify");
const { param, check, body } = require("express-validator");
const validatormiddleware = require("../../middlewares/validatorMiddleware");
exports.getPlantValidator = [
  check("id").isMongoId().withMessage("invalid plant id format"),
  validatormiddleware,
];
exports.createPlantValidator = [
  check("common_name").notEmpty().withMessage("plants required"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatormiddleware,
];
exports.updatePlantValidator = [
  check("plantId").isMongoId().withMessage("invalid plant id format"),
  body("common_name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatormiddleware,
];
exports.deletePlantValidator = [
  check("plantId").isMongoId().withMessage("invalid plant id format"),
  validatormiddleware,
];
