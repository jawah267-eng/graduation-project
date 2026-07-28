const UserPlant = require("../models/userplants");
const DiseasePlant = require("../models/diseas_plant");

// جلب النبات الذي اختاره المستخدم
//يعني بروح على معرف المستخدم بجيب صفحته ف بشوف كل نباتات اللي عنده
//بعدا بدور على بالامراض على نباتاته
//وبواسطة populate برجع المرض مع خصائصه
//@get diseases  of plant in userplants
//@route GET: /api/v1/diseases/userplant/:userPlantId
const getDiseasesByUserPlant = async (userPlantId) => {
  const userPlant = await UserPlant.findById(userPlantId);

  if (!userPlant) {
    return null;
  }

  //  هون البحث عن الأمراض الخاصة بهذا النبات
  const diseases = await DiseasePlant.find({
    plant_id: userPlant.plant_id,
  }).populate(
    "diseases_id",
    "name diseasestype symptoms prevention treatment peak_season",
  );

  return diseases;
};

module.exports = {
  getDiseasesByUserPlant,
};
