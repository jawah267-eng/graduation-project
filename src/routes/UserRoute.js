const express = require("express");
const router = express.Router();
const {
  createUsertValidator,
  getUsertValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/UserValidator");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadimage,
  setProfileImage,
  changeUserPassword,
} = require("../services/Userservice");
// هاد مشان تغير كلمة السر
router.put(
  "/changepassword/:id",
  changeUserPasswordValidator,
  changeUserPassword,
);

router
  .route("/")
  .get(getUsers)
  .post(uploadimage, setProfileImage, createUsertValidator, createUser);

router
  .route("/:id")
  .get(getUsertValidator, getUser)
  .put(uploadimage, setProfileImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
