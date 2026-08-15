const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendInquiryReceivedEmail = async (email, name) => {
  await transporter.sendMail({
    from: `"Flora Care" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "تم استلام استفسارك - Flora Care",

    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 2;">
        <h2>مرحبًا ${name} 🌱</h2>

        <p>
          تم استلام استفسارك بنجاح.
        </p>

        <p>
          سيتم التحقق من طلبك من قبل فريق Flora Care
          والرد عليك لاحقًا.
        </p>

        <p>
          شكرًا لاستخدامك Flora Care 🌿
        </p>
      </div>
    `,
  });
};

module.exports = {
  sendInquiryReceivedEmail,
};
