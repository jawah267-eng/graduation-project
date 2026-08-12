const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
userSchema.pre("save", async function (next) {
  //اذا كلمة السر لم تتعدل لا تلقا
  if (!this.isModified("password")) return next();
  // hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
