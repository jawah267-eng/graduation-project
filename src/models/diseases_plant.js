const mongoose = require("mongoose");

const diseas_plant = mongoose.Schema({
  plant_id: { type: mongoose.Schema.Types.ObjectId, ref: "plant" },
  diseases_id: { type: mongoose.Schema.Types.ObjectId, ref: "diseases" },
  susceptibility: {
    type: String,
    enum: ["very_low", "low", "moderate", "high", "very_high"],
  }, //درجة الحساسية
});
let dis_pl = mongoose.model("diseas_plant", diseas_plant);
module.exports = dis_pl;
