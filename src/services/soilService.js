const SoilPlant = require("../models/soil_plant");
const SoilType = require("../models/soiltypes");
const SoilProperties = require("../models/SoilProperties");

exports.getSoilsByPlant = async (plantId) => {
  // البحث عن جميع أنواع التربة المرتبطة بالنبتة
  const relations = await SoilPlant.find({
    plant_id: plantId,
  });

  const soilIds = relations.map((item) => item.soil_id);

  const soils = await SoilType.find({
    _id: { $in: soilIds },
  });

  const result = [];

  for (const soil of soils) {
    const properties = await SoilProperties.findOne({
      soil_type_id: soil._id,
    });

    result.push({
      ...soil.toObject(),
      properties,
    });
  }

  return result;
};
