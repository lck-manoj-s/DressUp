const mongoose = require("mongoose");

const combinationSchema = new mongoose.Schema({
  shirtColor: { type: String, required: true },
  shirtHex: { type: String, required: true },
  pantColor: { type: String, required: true },
  pantHex: { type: String, required: true },
  source: {
    type: String,
    enum: ["system", "user"],
    default: "system",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Combination", combinationSchema);
