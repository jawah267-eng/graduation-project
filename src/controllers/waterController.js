const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const WaterService = require("../services/waterService");
const ApiError = require("../utils/apiError");

exports.markAsWatered = asyncHandler(async (req, res, next) => {
  const { userPlantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userPlantId)) {
    return next(new ApiError("Invalid user plant id", 400));
  }

  const water = await WaterService.markAsWatered(userPlantId);

  if (!water) {
    return next(new ApiError("Water record not found for this plant", 404));
  }

  res.status(200).json(water);
});
