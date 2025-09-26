const mongoose = require("mongoose");

// Align schema with frontend fields and expectations
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    posterURL: { type: String, default: "" },
    description: { type: String, default: "" },
    genre: { type: String, default: "" },
    language: { type: String, default: "English" },
    status: {
      type: String,
      enum: ["Will Watch", "Watching", "Watched"],
      default: "Will Watch",
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    // Keep year and review for compatibility if needed
    year: { type: Number },
    review: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
