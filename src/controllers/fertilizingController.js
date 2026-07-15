const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const FertilizingService = require("../services/fertilizingService");
const ApiError = require("../utils/apiError");

exports.getFertilizingSchedule = asyncHandler(async (req, res) => {
  const schedule = await FertilizingService.getFertilizingSchedule();

  res.status(200).json({
    results: schedule.length,
    data: schedule,
  });
});

exports.markAsFertilized = asyncHandler(async (req, res, next) => {
  const { userPlantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userPlantId)) {
    return next(new ApiError("Invalid user plant id", 400));
  }

  const fertilizer = await FertilizingService.markAsFertilized(userPlantId);

  if (!fertilizer) {
    return next(new ApiError("Fertilizer record not found", 404));
  }

  res.status(200).json(fertilizer);
});
