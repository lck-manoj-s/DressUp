const express = require("express");
const Combination = require("../models/Combination");
const { askGeminiForValidCombos } = require("../utils/geminiHelper");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { shirtColors, pantColors } = req.body;

        const shirts = shirtColors
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        const pants = pantColors
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);

        const allPairs = shirts.flatMap((shirt) =>
            pants.map((pant) => ({ shirtColor: shirt, pantColor: pant }))
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

            if (results.length >= 6) break;
        }

        if (results.length < 6 && missingPairs.length > 0) {
            const newCombos = await askGeminiForValidCombos(missingPairs);

            for (const combo of newCombos) {
                const saved = await Combination.create({
                    ...combo,
                    source: "system",
                });
                results.push(saved);
            }
        }

        res.json({ combos: results });
    } catch (err) {
        console.error("Error in /api/colors:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
