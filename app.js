const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { cloudinary } = require("./src/config/cloudinary");
const plantroute = require("./src/routes/plantRoutes");
const path = require("path");
const { error } = require("console");
const ApiError = require("./src/utils/apiError");
const globalError = require("./src/middlewares/errorMiddleware");
const userPlantRoute = require("./src/routes/userPlantRoute");

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
//GET /api/v1/plants/:plantId/soils    مشان بصير هيك
app.use("/api/v1/plants", require("./src/routes/soilRoutes"));
//POST  /api/v1/userplants
app.use("/api/v1/userplants", userPlantRoute);
//PATCH /api/v1/water/:id
app.use("/api/v1/water", require("./src/routes/waterRoutes"));

// catch error "route not found"
app.use((req, res, next) => {
  // const err = new Error(`Can't find this route: ${req.originalUrl}`);
  // err.status = 404;
  // next(err);
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
// Global error handling middleware
app.use(globalError);

module.exports = app;
