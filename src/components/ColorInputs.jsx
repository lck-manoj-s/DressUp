import { useState,useEffect } from "react";

function ColorInputs() {
    const [shirtInput, setShirtInput] = useState("");
    const [pantInput, setPantInput] = useState("");
    const [combos, setCombos] = useState([]);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubmit = async () => {
        const shirt = shirtInput.trim();
        const pant = pantInput.trim();

        if (!shirt && !pant) {
            setStatus("Please enter at least one shirt and one pant color");
            setError(true);
            return;
        } else if (!shirt) {
            setStatus("Please enter shirt colors");
            setError(true);
            return;
        } else if (!pant) {
            setError(true);
            setStatus("Please enter pant colors");
            return;
        }

        setStatus("Processing...");
        setCombos([]);
        

        try {
            const res = await fetch("http://localhost:5000/api/colors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shirtColors: shirt,
                    pantColors: pant,
                }),
            });

            const data = await res.json();

            if (res.ok && Array.isArray(data.combos)) {
                setCombos(data.combos.slice(0, 6));
                setShirtInput("");
                setPantInput("");
                setStatus("");
            } else {
                setStatus("No combinations found.");
            }
        } catch (err) {
            console.error("Combo fetch failed", err);
            setStatus("Error fetching suggestions.");
        }
    };

    return (
        <div className="space-y-8 flex flex-col items-center w-full">
            {/* Form */}
            <div className="w-full max-w-md space-y-6 mb-5">
                <div>
                    <label className="block mb-2 text-blue-400 font-medium">
                        Your shirts
                    </label>
                    <input
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter upto 5 shirt colors separated by comma"
                        value={shirtInput}
                        onChange={(e) => setShirtInput(e.target.value)}
                        required
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
                        required
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Get Suggestions
                </button>
            </div>
            {status && (
                <p className={`text-sm font-medium mb-4 ${error? "text-red-500": "text-green-500"}`}>
                    {status}
                </p>
            )}
            {combos.length > 0 && (
                <div className="w-full max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {combos.map((combo, idx) => (
                            <div
                                key={idx}
                                className="p-4 border rounded bg-gray-50 shadow"
                            >
                                <div className="font-semibold text-blue-400 mb-3">
                                    Combo {idx + 1}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-5 h-5 rounded-full border"
                                        style={{
                                            backgroundColor: combo.shirtHex,
                                        }}
                                    ></div>
                                    <span>
                                        {capitalize(combo.shirtColor)} Shirt
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <div
                                        className="w-5 h-5 rounded-full border"
                                        style={{
                                            backgroundColor: combo.pantHex,
                                        }}
                                    ></div>
                                    <span>
                                        {capitalize(combo.pantColor)} Pant
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
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
