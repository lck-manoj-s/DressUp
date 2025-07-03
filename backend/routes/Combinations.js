const express = require("express");
const router = express.Router();
const Combination = require("../models/Combination");

router.post("/", async (req, res) => {
  const { shirtColor, pantColor, source } = req.body;
  try {
    const newCombo = await Combination.create({ shirtColor, pantColor, source });
    res.status(201).json(newCombo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const combos = await Combination.find();
    res.json(combos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
