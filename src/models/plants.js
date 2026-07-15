const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    common_name: {
      type: String,
      required: true,
      unique: [true, "plants must be unique"],
    },
    scientific_name: { type: String },
    family: { type: String },
    planting_season: { type: String },
    growth_period: { type: String },
    category: {
      type: String,
      //fiber → محاصيل تُزرع من أجل الألياف (قطن، كتان، جوت)
      //l → محاصيل تُزرع لإنتاج الزيوت (عباد الشمس، فول الصويا، السمسم).
      //cereals / grains → محاصيل حبوب غذائية أساسية (قمح، شعير، ذرة، أرز).
      //ornamental → نباتات زينة (ورد، أزهار).
      enum: ["fruit", "vegetables", "اعشاب", "زينة", "fiber", "cereals", "oil"],
    },
    preferred_soil: { type: String },
    ph_range: { min: Number, max: Number },
    temperature_range: { min: Number, max: Number },
    water_requirement: {
      type: String,
      enum: ["high", "low", "moderate", "moderate-high", "moderate-low"],
    },
    light_requirement: { type: String },
    drought_tolerance: { type: String },
    frost_tolerance: { type: String },
    average_yield: { type: String },
    water_requirement: {
      type: String,
      enum: ["high", "low", "moderate", "moderate-high", "moderate-low"],
    },
    watering_frequency_days: { type: Number, default: 7 },
    images: [
      {
        url: String,
      },
    ],
    slug: { type: String, lowercase: true, unique: true }, //a and b => plant.com/a-and-b تعويض المسافة بسلاش
  },
  { timestamps: true },
);

plantSchema.virtual("varieties", {
  ref: "Variety",
  localField: "_id",
  foreignField: "plant_id",
});

plantSchema.set("toJSON", { virtuals: true });
plantSchema.set("toObject", { virtuals: true });

const plant = mongoose.model("plant", plantSchema);
module.exports = plant;
