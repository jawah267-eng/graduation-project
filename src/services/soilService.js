const SoilPlant = require("../models/soil_plant");
const SoilType = require("../models/soiltypes");

exports.getSoilsByPlant = async (plantId) => {
  // البحث عن جميع أنواع التربة المرتبطة بالنبتة
  const relations = await SoilPlant.find({
    plant_id: plantId,
  });

  const soilIds = relations.map((item) => item.soil_id);

  const soils = await SoilType.find({
    _id: { $in: soilIds },
  });

  return soils;
};
