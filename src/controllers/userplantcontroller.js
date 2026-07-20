const UserPlant = require("../models/userplants");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const UserPlantService = require("../services/userPlantService");
const Plant = require("../models/plants");
const ApiError = require("../utils/apiError");

// // استقبال طلب الإنشاء
// exports.getUserPlants = async (req, res) => {
//   const data = await UserPlant.find({ user: req.user.id }).populate("plant"); //

//   res.json(data);
// };
///////////////////////////////////////////////////////////////////////
// انشاء جدول نبات المستخدم
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
////////////////////////////////////////////////////////////////////////////////
// برجع كل نباتات المستخدم
exports.getAllUserPlants = asyncHandler(async (req, res) => {
  const userPlants = await UserPlantService.getAllUserPlants();

  res.status(200).json({
    results: userPlants.length,
    data: userPlants,
  });
});
//////////////////////////////////////////////////////////////////////////////////////
//يرجع نبات معين
exports.getUserPlant = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid user plant id", 400));
  }

  const userPlant = await UserPlantService.getUserPlant(id);

  if (!userPlant) {
    return next(new ApiError("User plant not found", 404));
  }

  res.status(200).json({
    data: userPlant,
  });
});
//////////////////////////////////////////////////////////////////////////////////////////
//يعدل على نبات معبن
exports.updateUserPlant = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid user plant id", 400));
  }

  const userPlant = await UserPlantService.updateUserPlant(id, req.body);

  if (!userPlant) {
    return next(new ApiError("User plant not found", 404));
  }

  res.status(200).json({
    data: userPlant,
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////
//يحذف نبات معين
exports.deleteUserPlant = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid user plant id", 400));
  }

  const userPlant = await UserPlantService.deleteUserPlant(id);

  if (!userPlant) {
    return next(new ApiError("User plant not found", 404));
  }

  res.status(204).send();
});
///////////////////////////////////////////////////////////////////////////////////////////////
