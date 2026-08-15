const asyncHandler = require("express-async-handler");
const Inquiry = require("../models/inquiry");
const { sendInquiryReceivedEmail } = require("../services/emailService");

exports.createInquiry = asyncHandler(async (req, res, next) => {
  // إنشاء الاستفسار
  const inquiry = await Inquiry.create({
    user_id: req.user._id,
    subject: req.body.subject,
    message: req.body.message,
    image: req.file ? req.file.path : null,
  });

  // إرسال إيميل للمستخدم المسجل
  await sendInquiryReceivedEmail(req.user.email, req.user.name);

  res.status(201).json({
    status: "success",
    message: "تم إرسال الاستفسار بنجاح، وسيتم التحقق منه لاحقًا",
    data: inquiry,
  });
});
