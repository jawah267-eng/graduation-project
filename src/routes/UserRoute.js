const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadimage,
  resizeImage,
} = require("../services/Userservice");

router.route("/").get(getUsers).post(uploadimage, resizeImage, createUser);

router
  .route("/:id")
  .get(getUser)
  .put(uploadimage, resizeImage, updateUser)
  .delete(deleteUser);

module.exports = router;
