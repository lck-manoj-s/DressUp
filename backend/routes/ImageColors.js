const express = require("express");
const multer = require("multer");
const getColor = require("../utils/colorExtractor");
const { askGeminiForValidCombos } = require("../utils/geminiHelper");
const Combination = require("../models/Combination");

const router = express.Router();
const upload = multer();

router.post(
  "/",
  upload.fields([
    { name: "shirtImages", maxCount: 5 },
    { name: "pantImages", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const shirtFiles = req.files?.shirtImages || [];
      const pantFiles = req.files?.pantImages || [];

      if (!shirtFiles.length || !pantFiles.length) {
        return res
          .status(400)
          .json({ error: "Both shirt and pant images are required." });
      }
      
      const shirtHexes = await Promise.all(
        shirtFiles.map((file) => getColor(file.buffer))
      );
      const pantHexes = await Promise.all(
        pantFiles.map((file) => getColor(file.buffer))
      );

      const allPairs = shirtHexes.flatMap((shirt) =>
        pantHexes.map((pant) => ({
          shirtColor: shirt.name,
          shirtHex: shirt.hex,
          pantColor: pant.name,
          pantHex: pant.hex,
        }))
      );

      console.log("All combos:", allPairs);

      const existingCombos = [];
      const missingCombos = [];

      for (const pair of allPairs) {
        const found = await Combination.findOne({
          shirtColor: new RegExp(`^${pair.shirtColor}$`, "i"),
          pantColor: new RegExp(`^${pair.pantColor}$`, "i"),
        });

        if (found) {
          existingCombos.push(found);
        } else {
          missingCombos.push(pair);
        }
      }

      let newSavedCombos = [];
      // if (missingCombos.length > 0) {
      //   const validated = await askGeminiForValidCombos(missingCombos);
      //   newSavedCombos = await Combination.insertMany(
      //     validated.map((combo) => ({
      //       ...combo,
      //       source: "system",
      //     }))
      //   );
      // }

      const finalResults = [...existingCombos, ...newSavedCombos].slice(0, 6);

      res.json({ combos: finalResults });
    } catch (err) {
      console.error("Error in /api/image-colors:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
