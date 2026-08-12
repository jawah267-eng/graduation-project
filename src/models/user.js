const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: [true, "email required"],
      trim: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: true,
      minlingth: [6, "too short password"],
    },

    role: {
      type: String,
      enum: ["farmer", "advisor", "admin"],
      default: "farmer",
    },

    dateOfBirth: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
