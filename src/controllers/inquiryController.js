const asyncHandler = require("express-async-handler");
const Inquiry = require("../models/inquiry");
const { sendInquiryReceivedEmail } = require("../services/emailService");

exports.createInquiry = asyncHandler(async (req, res, next) => {
  console.log("✅ وصلنا للـ controller");

  console.log("USER:", req.user);
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const inquiry = await Inquiry.create({
    user_id: req.user._id,
    subject: req.body.subject,
    message: req.body.message,
    image: req.file ? req.file.path : null,
  });

  console.log("✅ تم حفظ الاستفسار");

  await sendInquiryReceivedEmail(req.user.email, req.user.name);

  try {
    await sendInquiryReceivedEmail(req.user.email, req.user.name);

    console.log("✅ تم إرسال الإيميل");
  } catch (error) {
    console.error("❌ خطأ بإرسال الإيميل:", error);
  }

  res.status(201).json({
    status: "success",
    message: "تم إرسال الاستفسار بنجاح",
    data: inquiry,
  });
});
