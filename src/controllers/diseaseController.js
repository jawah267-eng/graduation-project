const mongoose = require("mongoose");
const asynchandler = require("express-async-handler");

const diseaseService = require("../services/diseaseService");
const ApiError = require("../utils/apiError");

exports.getDiseasesByUserPlant = asynchandler(async (req, res, next) => {
  const { userPlantId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userPlantId)) {
    return next(new ApiError("Invalid ID", 400));
  }

  // جلب الأمراض
  const diseases = await diseaseService.getDiseasesByUserPlant(userPlantId);

  if (!diseases) {
    return next(
      new ApiError(`User plant not found for this id ${userPlantId}`, 404),
    );
  }

  res.status(200).json({
    results: diseases.length,
    data: diseases,
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// انشاء مرض
exports.createDisease = asynchandler(async (req, res, next) => {
  //لتأكد أن اسم المرض موجود
  if (!req.body.name) {
    return next(new ApiError("Disease name is required", 400));
  }
  const image = req.file
    ? {
        url: req.file.path,
      }
    : req.body.image || null;

  const disease = await diseaseService.createDisease({
    ...req.body,
    image,
  });
  res.status(201).json(disease);
});
///////////////////////////////////////////////////////////////////////////////////////
// جلب كل الامراض
exports.getAllDiseases = asynchandler(async (req, res) => {
  const diseases = await diseaseService.getAllDiseases();

  res.status(200).json({
    results: diseases.length,
    data: diseases,
  });
});
//////////////////////////////////////////////////////////////////////////////////
//جلب مرض معين حسب الid
exports.getDisease = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid ID", 400));
  }

  const disease = await diseaseService.getDiseaseById(id);

  if (!disease) {
    return next(new ApiError(`Disease not found for this id ${id}`, 404));
  }

  res.status(200).json(disease);
});
/////////////////////////////////////////////////////////////////////////////////
//تعديل مرض
exports.updateDisease = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid ID", 400));
  }

  const disease = await diseaseService.updateDisease(id, req.body);

  if (!disease) {
    return next(new ApiError(`No disease found with id ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: disease,
  });
});
///////////////////////////////////////////////////////////////////////////////
//حذف مرض
exports.deleteDisease = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid ID", 400));
  }

  const disease = await diseaseService.deleteDisease(id);

  if (!disease) {
    return next(new ApiError(`No disease found with id ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: "Disease deleted successfully",
  });
});
