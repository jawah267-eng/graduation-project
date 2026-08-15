require("dotenv").config();

const sendEmail = require("./src/utils/sendEmail");

sendEmail({
  email: "jawa@gmail.com",
  subject: "Test Email",
  message: "Nodemailer شغال تمام 🎉",
})
  .then(() => console.log("Email sent successfully"))
  .catch((err) => console.error("Email error:", err));
