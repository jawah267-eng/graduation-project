const express = require("express");
const router = express.Router();
const Authservice = require("../services/authService");

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
  Authservice.protect,
  changeUserPasswordValidator,
  changeUserPassword,
);

router
  .route("/")
  .get(Authservice.protect, Authservice.restrictTo("admin"), getUsers)
  .post(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    uploadimage,
    setProfileImage,
    createUsertValidator,
    createUser,
  );

router
  .route("/:id")
  .get(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    getUsertValidator,
    getUser,
  )
  .put(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    uploadimage,
    setProfileImage,
    updateUserValidator,
    updateUser,
  )
  .delete(
    Authservice.protect,
    Authservice.restrictTo("admin"),
    deleteUserValidator,
    deleteUser,
  );

module.exports = router;
