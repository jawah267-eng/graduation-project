const UserPlant = require("../models/userplants");
const DiseasePlant = require("../models/diseases_plant");

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
////////////////////////////////////////////////////////////////////
//@post diseases  of plant in schedule diseases
//@route post: /api/v1/diseases
// إنشاء مرض جديد
const createDisease = async (data) => {
  return await Disease.create(data);
};
////////////////////////////////////////////////////////////////////
//@get list of diseases-plant
//@route Get:/api/v1/diseases/
// جلب جميع الأمراض
const getAllDiseases = async () => {
  return await Disease.find();
};
/////////////////////////////////////////////////////////////
//@get disese by id
//@route Get:/api/v1/diseases/userplant/:userPlantId
// جلب مرض حسب الـ id
const getDiseaseById = async (id) => {
  return await Disease.findById(id);
};
//////////////////////////////////////////////////////////
//@update diseas
//@route Put:/api/v1/diseases
// تعديل مرض
const updateDisease = async (id, data) => {
  return await Disease.findByIdAndUpdate(id, data, {
    new: true,
  });
};
//////////////////////////////////////////////////////
//@delete diseas
//@route delete:/api/v1/diseases/userpl
// حذف مرض
const deleteDisease = async (id) => {
  return await Disease.findByIdAndDelete(id);
};

module.exports = {
  getDiseasesByUserPlant,
  createDisease,
  getAllDiseases,
  getDiseaseById,
  updateDisease,
  deleteDisease,
};
