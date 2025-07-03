const mongoose = require("mongoose");

const combinationSchema = new mongoose.Schema({
  shirtColor: String,
  pantColor: String,
  source: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Combination", combinationSchema);
