const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "answered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Inquiry", inquirySchema);
