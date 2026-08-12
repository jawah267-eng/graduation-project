const express = require("express");
const router = express.Router();
const { createUsertValidator } = require("../utils/validators/UserValidator");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadimage,
  setProfileImage,
} = require("../services/Userservice");

router
  .route("/")
  .get(getUsers)
  .post(uploadimage, setProfileImage, createUsertValidator, createUser);

router
  .route("/:id")
  .get(getUser)
  .put(uploadimage, setProfileImage, updateUser)
  .delete(deleteUser);

module.exports = router;
