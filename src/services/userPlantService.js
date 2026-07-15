const UserPlant = require("../models/userplants");
const Water = require("../models/watering");
const Plant = require("../models/plants");

// منطق الإنشاء المزدوج للجدولين
exports.createUserPlant = async (data) => {
  // 1. إنشاء سجل UserPlant
  const userPlant = await UserPlant.create(data);

  // 2. جلب عدد أيام الري من النبات
  const plant = await Plant.findById(userPlant.plant_id);
  const frequencyDays = plant?.watering_frequency_days || 7;

  // 3. أول موعد ري = تاريخ الزراعة (أو اليوم لو ما محدد) + عدد أيام التكرار
  const lastWateringDate = userPlant.planting_date || new Date();
  const nextWateringDate = new Date(lastWateringDate);
  nextWateringDate.setDate(nextWateringDate.getDate() + frequencyDays);

  // 4. إنشاء سجل Water
  const water = await Water.create({
    user_plant_id: userPlant._id,
    last_watering_date: lastWateringDate,
    frequency_days: frequencyDays,
    next_watering_date: nextWateringDate,
  });

  return { userPlant, water };
};
