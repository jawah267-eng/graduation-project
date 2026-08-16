const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready");
  }
});
const sendInquiryReceivedEmail = async (email, name) => {
  console.log("📧 محاولة إرسال الإيميل إلى:", email);

  const info = await transporter.sendMail({
    from: `"Flora Care" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "تم استلام استفسارك - Flora Care",

    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 2;">
        <h2>مرحبًا ${name} 🌱</h2>

        <p>تم استلام استفسارك بنجاح.</p>

        <p>
          سيتم التحقق من طلبك من قبل فريق Flora Care
          والرد عليك لاحقًا.
        </p>

        <p>شكرًا لاستخدامك Flora Care 🌿</p>
      </div>
    `,
  });

  console.log("📧 Email sent:", info.messageId);

  return info;
};

module.exports = {
  sendInquiryReceivedEmail,
};
