const mongoose = require("mongoose");

const waterSchema = new mongoose.Schema({
  user_plant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userplants",
  },
  last_watering_date: { type: Date },
  frequency_days: { type: Number },
  next_watering_date: { type: Date },
});
let water = mongoose.model("water", waterSchema);
module.exports = water;
