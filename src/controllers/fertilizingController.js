const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const FertilizingService = require("../services/fertilizingService");
const ApiError = require("../utils/apiError");

exports.getFertilizingSchedule = asyncHandler(async (req, res) => {
  const schedule = await FertilizingService.getFertilizingSchedule();

  const result = schedule.map((item) => ({
    plant_name: item.user_plant_id.plant_id.common_name,
    fertilizer_type: item.fertilizer_type,
    last_fertilizing_date: item.last_fertilizing_date,
    next_fertilizing_date: item.next_fertilizing_date,
    frequency_days: item.frequency_days,
  }));
  res.status(200).json({
    results: result.length,
    data: result,
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
