const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const WaterService = require("../services/waterService");
const ApiError = require("../utils/apiError");
// استقبال طلب تم الري
exports.markAsWatered = asyncHandler(async (req, res, next) => {
  const { userPlantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userPlantId)) {
    return next(new ApiError("Invalid user plant id", 400));
  }
  // استدعاء الـ service يلي بيحدث last_watering_date و next_watering_date
  const water = await WaterService.markAsWatered(userPlantId);
  // إذا ما في سجل Water مرتبط بهاد الـ userPlantId
  if (!water) {
    return next(new ApiError("Water record not found for this plant", 404));
  }

  res.status(200).json(water);
});
/////////////////////////////////////////////////////////////////////

exports.getWaterSchedule = asyncHandler(async (req, res) => {
  const waterSchedule = await WaterService.getWaterSchedule();

  const result = waterSchedule.map((item) => ({
    plant_name: item.user_plant_id.plant_id.common_name,
    last_watering_date: item.last_watering_date,
    next_watering_date: item.next_watering_date,
    frequency_days: item.frequency_days,
  }));

  res.status(200).json({
    results: result.length,
    data: result,
  });
});
