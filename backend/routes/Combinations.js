const express = require("express");
const router = express.Router();
const Combination = require("../models/Combination");

router.post("/", async (req, res) => {
  const { shirtColor, shirtHex, pantColor, pantHex, source } = req.body;

  if (!shirtColor || !shirtHex || !pantColor || !pantHex) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newCombo = await Combination.create({
      shirtColor,
      shirtHex,
      pantColor,
      pantHex,
      source: source || "user",
    });
    res.status(201).json(newCombo);
  } catch (err) {
    res.status(500).json({ error: "Failed to save combination" });
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
