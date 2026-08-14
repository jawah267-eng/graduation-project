const slugify = require("slugify");
const { param, check, body } = require("express-validator");
const validatormiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/user");

// @desc  signup
// route POST /api/v1/auth/signup
//access puplic
exports.SignUpValidator = [
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
      User.findOne({ email: val }).then((User) => {
        if (User) {
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
  validatormiddleware,
];
//////////////////////////////////////////////////////////////////////////////////
// @desc  login
// route POST /api/v1/auth/login
//access puplic
exports.LogInValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email adress"),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 charecters "),
  validatormiddleware,
];
