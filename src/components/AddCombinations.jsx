import { useState } from "react";

function AddCombinations() {
    const [shirtInput, setShirtInput] = useState("");
    const [pantInput, setPantInput] = useState("");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("");

    const handleSubmit = async () => {
        const shirt = shirtInput.trim();
        const pant = pantInput.trim();

        if (!shirt && !pant) {
            setStatus("Please enter at least one shirt and one pant color");
            setStatusType("error");
            return;
        } else if (!shirt) {
            setStatus("Please enter shirt colors");
            setStatusType("error");
            return;
        } else if (!pant) {
            setStatusType("error");
            setStatus("Please enter pant colors");
            return;
        }

        setStatus("Processing...");

        try {
            const geminiResponse = await fetch(
                "http://localhost:5000/api/gemini",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        shirtColors: shirtInput,
                        pantColors: pantInput,
                    }),
                }
            );

            const combos = await geminiResponse.json();

            for (const combo of combos) {
                const res = await fetch(
                    "http://localhost:5000/api/combinations",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            shirtColor: combo.shirtColor,
                            shirtHex: combo.shirtHex,
                            pantColor: combo.pantColor,
                            pantHex: combo.pantHex,
                            source: "user",
                        }),
                    }
                );

                const data = await res.json();

                if (res.status === 409) {
                    setStatus(data.message);
                    setStatusType("error");
                    return;
                }
            }

            setStatusType("success");
            setStatus("All combinations saved successfully!");
            setShirtInput("");
            setPantInput("");

            setTimeout(() => {
                setStatus("");
                setStatusType("");
            }, 10000);
        } catch (err) {
            console.error(err);
            setStatusType("error");
            setStatus("Something went wrong while saving.");

            setTimeout(() => {
                setStatus("");
                setStatusType("");
            }, 10000);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 text-center">
                Add Your Favorite Combos
            </h2>

            <div className="space-y-8">
                <div>
                    <label className="block mb-2 text-blue-400 font-medium">
                        Your choices for shirts
                    </label>
                    <input
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter multiple colors separated by comma"
                        value={shirtInput}
                        onChange={(e) => setShirtInput(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-blue-400 font-medium">
                        Your choices for pants
                    </label>
                    <input
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter multiple colors separated by comma"
                        value={pantInput}
                        onChange={(e) => setPantInput(e.target.value)}
                        required
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Submit
            </button>

            {status && (
                <p
                    className={`text-sm ${
                        statusType === "error"
                            ? "text-red-600"
                            : "text-green-600"
                    }`}
                >
                    {status}
                </p>
            )}
        </div>
    );
}

export default AddCombinations;
