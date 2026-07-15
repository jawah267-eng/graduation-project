const Fertilizing = require("../models/Fertilizing");

exports.getFertilizingSchedule = async () => {
  return await Fertilizing.find().populate({
    path: "user_plant_id",
    populate: {
      path: "plant_id",
      select: "common_name",
    },
  });
};

exports.markAsFertilized = async (userPlantId) => {
  const fertilizer = await Fertilizing.findOne({
    user_plant_id: userPlantId,
  });

  if (!fertilizer) return null;

  fertilizer.last_fertilizing_date = new Date();

  fertilizer.next_fertilizing_date = new Date();

  fertilizer.next_fertilizing_date.setDate(
    fertilizer.next_fertilizing_date.getDate() + fertilizer.frequency_days,
  );

  await fertilizer.save();

  return fertilizer;
};
