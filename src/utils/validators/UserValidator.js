const slugify = require("slugify");
const { param, check, body } = require("express-validator");
const validatormiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/user");

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
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("password confirmation incorrect");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("password confirmation required"),

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

exports.changeUserPasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("you must enter your current password"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("you must enter the password confirm"),
  body("password")
    .notEmpty()
    .withMessage("you must enter your password")
    .custom(async (val, { req }) => {
      //1) verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("there is no user for this id");
      }
      const isCurrentPassword = await bcrypt.compare(
        req.body.currentPassword,
        userPassword,
      );
      if (!isCurrentPassword) {
        throw new Error("Incorrect current password");
      }
      //2) verify password confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error("password confirmation incorrect");
      }
      return true;
    }),
  validatormiddleware,
];
