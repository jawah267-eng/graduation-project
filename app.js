const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { cloudinary } = require("./src/config/cloudinary");
const plantroute = require("./src/routes/plantRoutes");
const path = require("path");
// init app
const app = express();

app.use(cors());

//apply middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));

  console.log(`mode:${process.env.NODE_ENV}`);
}
app.get("/", (req, res) => {
  res.send("Server is running");
});
// عرض الصور بشكل عام
//http://localhost:5000/images/1780419528779-photo_2026-06-02_08-31-53.jpg
app.use("/images", express.static(path.join(__dirname, "src", "images")));
//Routes
app.use("/api/upload", require("./src/routes/uploadRoute"));
// app.use("/api/test", require("./src/routes/testRoutes"));
app.use("/api/v1/plants", plantroute);

module.exports = app;
