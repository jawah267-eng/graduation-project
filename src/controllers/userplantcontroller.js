const UserPlant = require("../models/userplants");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const UserPlantService = require("../services/userPlantService");
const Plant = require("../models/plants");
const ApiError = require("../utils/apiError");

// استقبال طلب الإنشاء
exports.getUserPlants = async (req, res) => {
  const data = await UserPlant.find({ user: req.user.id }).populate("plant"); //

  res.json(data);
};
///////////////////////////////////////////////////////////////////////
exports.createUserPlant = asyncHandler(async (req, res, next) => {
  const { plant_id } = req.body;

  // التحقق من صحة الـ ID
  if (!mongoose.Types.ObjectId.isValid(plant_id)) {
    return next(new ApiError("Invalid plant id", 400));
  }

  // التأكد أن النبات موجود
  const plant = await Plant.findById(plant_id);

  if (!plant) {
    return next(new ApiError("Plant not found", 404));
  }

  // إنشاء السجل
  const result = await UserPlantService.createUserPlant(req.body);

  res.status(201).json(result);
});
