const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendInquiryReceivedEmail = async (email, name) => {
  console.log("📧 محاولة إرسال الإيميل إلى:", email);

  const { data, error } = await resend.emails.send({
    from: "Flora Care <onboarding@resend.dev>",
    to: [email],
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

  if (error) {
    console.error("❌ خطأ بإرسال الإيميل:", error);
    throw new Error(error.message);
  }

  console.log("✅ Email sent:", data);
  return data;
};

module.exports = {
  sendInquiryReceivedEmail,
};
