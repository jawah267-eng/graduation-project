const Water = require("../models/watering");
// عم ابني منطق تم الري
exports.markAsWatered = async (userPlantId) => {
  // 1. البحث عن سجل المياه المرتبط بالنبتة
  const waterRecord = await Water.findOne({ user_plant_id: userPlantId });

  if (!waterRecord) {
    return null;
  }
  // 2. تحديد تاريخ الري (اليوم) وتاريخ الري القادم
  const today = new Date();
  const nextWateringDate = new Date(today);
  nextWateringDate.setDate(
    nextWateringDate.getDate() + waterRecord.frequency_days,
  );
  // 3. تحديث القيم في قاعدة البيانات
  waterRecord.last_watering_date = today;
  waterRecord.next_watering_date = nextWateringDate;

  await waterRecord.save();

  return waterRecord;
};
