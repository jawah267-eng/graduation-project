const slugify = require("slugify");
const { param, check, body } = require("express-validator");
const validatormiddleware = require("../../middlewares/validatorMiddleware");
const user = require("../../models/user");

exports.getUsertValidator = [
  check("id").isMongoId().withMessage("invalid user id format"),
  validatormiddleware,
];
exports.createUsertValidator = [
  check("name")
    .notEmpty()
    .withMessage("user required")
    .isLength({ max: 32 })
    .withMessage("Too long user name"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email adress")
    .custom((val) =>
      user.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
        }
      }),
    ),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  check("profileImg").optional(),
  check("phone").optional().isMobilePhone(["ar-SY"]),
  validatormiddleware,
];
exports.updateUserValidator = [
  check("id").isMongoId().withMessage("invalid user id format"),

  body("name")
    .optional()
    .isLength({ max: 32 })
    .withMessage("Too long user name"),

  body("name").custom((val, { req }) => {
    if (val) {
      req.body.slug = slugify(val);
    }
    return true;
  }),
  body("email").optional().isEmail().withMessage("Invalid email address"),

  body("phone")
    .optional()
    .isMobilePhone(["ar-SY"])
    .withMessage("Invalid phone number"),

  body("profileImg").optional(),
  validatormiddleware,
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("invalid user id format"),
  validatormiddleware,
];
