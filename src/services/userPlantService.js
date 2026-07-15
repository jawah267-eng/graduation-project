const UserPlant = require("../models/userplants");
const Water = require("../models/watering");
const Plant = require("../models/plants");
const Fertilizing = require("../models/Fertilizing");

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
//////////////////////////////////////////////////////////////
// انشاء سجل fertilizing
const lastFertilizingDate = new Date();

const nextFertilizingDate = new Date(lastFertilizingDate);

nextFertilizingDate.setDate(
  nextFertilizingDate.getDate() + plant.fertilizing_frequency_days,
);

await Fertilizing.create({
  user_plant_id: userPlant._id,
  fertilizer_type: plant.fertilizer_type,
  last_fertilizing_date: lastFertilizingDate,
  frequency_days: plant.fertilizing_frequency_days,
  next_fertilizing_date: nextFertilizingDate,
});
