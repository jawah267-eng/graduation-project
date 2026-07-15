const mongoose = require("mongoose");

const soilplant = new mongoose.Schema({
  soil_id: { type: mongoose.Schema.Types.ObjectId, ref: "soil" },
  plant_id: { type: mongoose.Schema.Types.ObjectId, ref: "plants" },
});
