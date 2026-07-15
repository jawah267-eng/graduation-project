const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const soilService = require("../services/soilService");

exports.getSoilsByPlant = asyncHandler(async (req, res, next) => {
  const { plantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return next(new ApiError("Invalid plant id", 400));
  }

  const soils = await soilService.getSoilsByPlant(plantId);

  if (!soils.length) {
    return next(
      new ApiError("No suitable soil types found for this plant", 404),
    );
  }

  res.status(200).json({
    results: soils.length,
    data: soils,
  });
});
