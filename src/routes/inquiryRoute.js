const express = require("express");
const router = express.Router();

const Authservice = require("../services/authService");
const inquiryController = require("../controllers/inquiryController");

router.post("/", Authservice.protect, inquiryController.createInquiry);

module.exports = router;
