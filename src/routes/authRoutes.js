const express = require("express");
const router = express.Router();
const {
  SignUpValidator,
  LogInValidator,
} = require("../utils/validators/authValidator");

const { SingUp, LogIn } = require("../services/authService");

// // هاد مشان تغير كلمة السر
// router.put(
//   "/changepassword/:id",
//   changeUserPasswordValidator,
//   changeUserPassword,
// );

router.route("/signup").post(SignUpValidator, SingUp);
router.route("/login").post(LogInValidator, LogIn);

// router
//   .route("/:id")
//   .get(getUsertValidator, getUser)
//   .put(uploadimage, setProfileImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
