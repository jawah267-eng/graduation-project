const UserPlant = require("../models/userplants");
const Water = require("../models/watering");
const Plant = require("../models/plants");
const Fertilizing = require("../models/Fertilizing");

// منطق الإنشاء المزدوج للجدولين
const createUserPlant = async (data) => {
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

  // انشاء سجل fertilizing
  const lastFertilizingDate = new Date();

  const nextFertilizingDate = new Date(lastFertilizingDate);

  nextFertilizingDate.setDate(
    nextFertilizingDate.getDate() + plant.fertilizing_frequency_days,
  );

  const fertilizer = await Fertilizing.create({
    user_plant_id: userPlant._id,
    fertilizer_type: plant.fertilizer_type,
    last_fertilizing_date: lastFertilizingDate,
    frequency_days: plant.fertilizing_frequency_days,
    next_fertilizing_date: nextFertilizingDate,
  });

  return { userPlant, water, fertilizer };
};
/////////////////////////////////////////////////////////////////
// @get a list of userplants
// @rote  get: api/v1/userplants
const getAllUserPlants = async (userId) => {
  const userPlants = await UserPlant.find({ user_id: userId }).populate(
    "plant_id",
    "common_name",
  );
  const result = await Promise.all(
    userPlants.map(async (userPlant) => {
      const water = await Water.findOne({
        user_plant_id: userPlant._id,
      });

      const fertilizer = await Fertilizing.findOne({
        user_plant_id: userPlant._id,
      });

      return {
        ...userPlant.toObject(),
        water,
        fertilizer,
      };
    }),
  );

  return result;
};
/////////////////////////////////////////////////////////////
// @get a list of userplants by id
// @rote  get: api/v1/userplants/:id
const getUserPlant = async (id) => {
  return await UserPlant.findOne({
    _id: id,
    user_id: userId,
  })
    .populate("plant_id", "common_name")
    .populate("user_id");
};
///////////////////////////////////////////////////////////////////
// @update t of userplants
// @rote  update: api/v1/userplants/:id
const updateUserPlant = async (id, userId, data) => {
  return await UserPlant.findOneAndUpdate(
    {
      _id: id,
      user_id: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};
///////////////////////////////////////////////////////////////////
// @delete  of userplants
// @rote  delete: api/v1/userplants/:id
const deleteUserPlant = async (id, userId) => {
  const userPlant = await UserPlant.findOneAndDelete({
    _id: id,
    user_id: userId,
  });

  if (!userPlant) {
    return null;
  }

  await Water.deleteOne({ user_plant_id: id });
  await Fertilizing.deleteOne({ user_plant_id: id });

  return userPlant;
};
module.exports = {
  createUserPlant,
  getAllUserPlants,
  getUserPlant,
  updateUserPlant,
  deleteUserPlant,
};
