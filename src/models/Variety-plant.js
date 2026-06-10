const mongoose = require("mongoose");

const varietySchema = new mongoose.Schema({
  common_name: {
    type: String,
    required: true,
  },

  plant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
  },

  type: {
    type: String,
    enum: ["local", "imported"],
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },

  characteristics: {
    fruit_color: String,
    fruit_size: String,
    fruit_shape: String,
    taste: String,
    flesh_texture: String,
  },

  harvest_time: String,
  images: [
    {
      url: String,
    },
  ],
});

module.exports = mongoose.model("Variety", varietySchema);
