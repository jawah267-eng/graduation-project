require("dotenv").config();
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
