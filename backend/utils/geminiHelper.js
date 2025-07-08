import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askGeminiForValidCombos(pairs) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const input = pairs.map(
    (p, i) => `${i + 1}. ${p.shirtColor} shirt + ${p.pantColor} pant`
  ).join("\n");

  const prompt = `
Given the following shirt and pant color pairs, identify which ones make good combinations for men's fashion.
For each valid pair, return an object with:
- shirtColor
- pantColor
- shirtHex
- pantHex

Use readable color names and hex codes.
Respond ONLY as a JSON array like:
[
  {
    "shirtColor": "Maroon",
    "pantColor": "Beige",
    "shirtHex": "#800000",
    "pantHex": "#f5f5dc"
  }
]
- Every hex code must be valid (6-digit, start with #)
- Do NOT return null or undefined for any hex
- Use the closest CSS-recognized hex if unsure

Input:
${input}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonStart = response.indexOf("[");
    const jsonEnd = response.lastIndexOf("]") + 1;
    const jsonString = response.slice(jsonStart, jsonEnd);

    const combos = JSON.parse(jsonString);
    return combos;
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return [];
  }
}
