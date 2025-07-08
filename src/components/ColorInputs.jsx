import { useState } from "react";

function ColorInputs() {
    const [shirtInput, setShirtInput] = useState("");
    const [pantInput, setPantInput] = useState("");
    const [combos, setCombos] = useState([]);

    const handleSubmit = async () => {
        if (!shirtInput || !pantInput) return;

        try {
            const res = await fetch("http://localhost:5000/api/colors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shirtColors: shirtInput,
                    pantColors: pantInput,
                }),
            });

            const data = await res.json();

            if (res.ok && Array.isArray(data.combos)) {
                setCombos(data.combos.slice(0, 3)); // show only 3
                setShirtInput("");
                setPantInput("");
            }
        } catch (err) {
            console.error("Combo fetch failed", err);
        }
    };

    return (
        <div className="space-y-2 flex justify-center">
            {/* Form */}
            <div className="w-full max-w-md space-y-6">
                <div>
                    <label className="block mb-2 text-blue-400 font-medium">
                        Your shirts
                    </label>
                    <input
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter upto 5 shirt colors separated by comma"
                        value={shirtInput}
                        onChange={(e) => setShirtInput(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-blue-400 font-medium">
                        Your pants
                    </label>
                    <input
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter upto 5 pant colors separated by comma"
                        value={pantInput}
                        onChange={(e) => setPantInput(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Get Suggestions
                </button>
            </div>

            {/* Combo Results */}
            {combos.length > 0 && (
                <div className="mt-6 space-y-4">
                    {combos.map((combo, idx) => (
                        <div
                            key={idx}
                            className="p-4 border rounded bg-gray-50"
                        >
                            <div className="font-medium text-gray-800 mb-2">
                                Combo {idx + 1}
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-5 h-5 rounded-full border"
                                    style={{ backgroundColor: combo.shirtHex }}
                                ></div>
                                <span>
                                    {capitalize(combo.shirtColor)} Shirt
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <div
                                    className="w-5 h-5 rounded-full border"
                                    style={{ backgroundColor: combo.pantHex }}
                                ></div>
                                <span>{capitalize(combo.pantColor)} Pant</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function capitalize(text) {
    return text
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

export default ColorInputs;
