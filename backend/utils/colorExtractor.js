const ColorThief = require("colorthief");
const namer = require("color-namer");

async function getColor(buffer) {
  try {
    const rgb = await ColorThief.getColor(buffer);

    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

    const name = namer(hex).pantone[0].name;

    console.log(buffer, name, hex);

    return { name, hex };
  } catch (err) {
    console.error("Color extraction failed:", err);
    return { name: "Unknown", hex: "#000000" };
  }
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toLowerCase()
  );
}

module.exports = getColor;
