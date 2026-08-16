const express = require("express");
const router = express.Router();

const Authservice = require("../services/authService");
const upload = require("../middlewares/uploadMiddleware");
const inquiryController = require("../controllers/inquiryController");

router.post(
  "/",
  Authservice.protect,
  upload.single("image"),
  inquiryController.createInquiry,
);

module.exports = router;
