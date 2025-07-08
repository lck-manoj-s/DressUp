import express from "express";
import Combination from "../models/Combination.js";
import { askGeminiForValidCombos } from "../utils/geminiHelper.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { shirtColors, pantColors } = req.body;

    const shirts = shirtColors.split(",").map(s => s.trim()).filter(Boolean);
    const pants = pantColors.split(",").map(p => p.trim()).filter(Boolean);

    const allPairs = shirts.flatMap(shirt =>
      pants.map(pant => ({ shirtColor: shirt, pantColor: pant }))
    );

    const results = [];
    const missingPairs = [];

    for (const pair of allPairs) {
      const found = await Combination.findOne({
        shirtColor: new RegExp(`^${pair.shirtColor}$`, "i"),
        pantColor: new RegExp(`^${pair.pantColor}$`, "i"),
      });

      if (found) {
        results.push(found);
      } else {
        missingPairs.push(pair);
      }

      if (results.length >= 3) break;
    }


    if (results.length < 3 && missingPairs.length > 0) {
      const newCombos = await askGeminiForValidCombos(missingPairs);

      for (const combo of newCombos) {
        const saved = await Combination.create({
          ...combo,
          source: "system",
        });
        results.push(saved);
        if (results.length >= 3) break;
      }
    }

    res.json({ combos: results.slice(0, 3) });
  } catch (err) {
    console.error("Error in /api/colors:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
