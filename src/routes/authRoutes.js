const express = require("express");
const router = express.Router();
const { SignUpValidator } = require("../utils/validators/authValidator");

const { SingUp } = require("../services/authService");

// // هاد مشان تغير كلمة السر
// router.put(
//   "/changepassword/:id",
//   changeUserPasswordValidator,
//   changeUserPassword,
// );

router.route("/signup").post(SignUpValidator, SingUp);

// router
//   .route("/:id")
//   .get(getUsertValidator, getUser)
//   .put(uploadimage, setProfileImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const { SingUp } = require("../services/authService");

// router.post("/signup", SingUp);

// module.exports = router;
