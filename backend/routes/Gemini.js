const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAK4CC2kM6WKy-dqNzi3bvUSAyt284qo9E");

router.post("/", async (req, res) => {
    const { shirtColors, pantColors } = req.body;

    if (!shirtColors || !pantColors) {
        return res
            .status(400)
            .json({ error: "Shirt and pant colors required" });
    }

    const prompt = `
You will be given two lists of colors, one for shirts and one for pants.

Your task is to match the first shirt color to the first pant color, the second shirt to the second pant, and so on.

Each pair should be returned in this JSON format:

[
  {
    "shirtColor": "light blue",
    "shirtHex": "#ADD8E6",
    "pantColor": "black",
    "pantHex": "#000000"
  },
  ...
]

Only return the JSON array. Do not generate all combinations — just match one-to-one in order.
If one list is longer, ignore extra entries.
IMPORTANT:
- Every hex code must be valid (6-digit, start with #)
- Do NOT return null or undefined for any hex
- Use the closest CSS-recognized hex if unsure
Shirt colors: ${shirtColors}
Pant colors: ${pantColors}
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Try parsing the JSON from the model's response
        const jsonStart = text.indexOf("[");
        const jsonEnd = text.lastIndexOf("]") + 1;
        const jsonStr = text.slice(jsonStart, jsonEnd);

        const combos = JSON.parse(jsonStr);
        res.json(combos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Gemini API call failed" });
    }
});

module.exports = router;
