require("dotenv").config();

console.log("ENV PATH:", process.cwd());
console.log("JWT SECRET:", process.env.JWT_SECRET_KEY);
console.log("JWT EXPIRE:", process.env.JWT_EXPIRE_TIME);

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
  console.log("connected successfully");
});
// .catch((error) => {
//   console.log("error with connecting with the DB", error);
// });

const server = app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
// handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(` unhandledRejection Errors: ${err.name}|${err.message} `);
  Server.close(() => {
    console.error("shutting down....");
    process.exit(1);
  });
});
const sendEmail = require("./utils/sendEmail");

sendEmail({
  email: "إيميلك الشخصي",
  subject: "Test Email",
  message: "إذا وصلتك هذه الرسالة، Nodemailer شغال تمام 🎉",
})
  .then(() => console.log("Email sent successfully"))
  .catch((err) => console.log(err));
