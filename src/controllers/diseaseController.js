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
