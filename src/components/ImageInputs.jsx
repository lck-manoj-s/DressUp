import { useState } from "react";

function ImageInputs() {
    const [shirtImages, setShirtImages] = useState([]);
    const [pantImages, setPantImages] = useState([]);
    const [combos, setCombos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e, type) => {
        alert("Upload image containing only shirt or pant without background noise");
        const files = Array.from(e.target.files).slice(0, 5);
        if (type === "shirt") setShirtImages(files);
        else setPantImages(files);
    };

    const handleSubmit = async () => {
        if (shirtImages.length === 0 || pantImages.length === 0) return;
        setLoading(true);
        setCombos([]);

        const formData = new FormData();
        shirtImages.forEach((file) => formData.append("shirtImages", file));
        pantImages.forEach((file) => formData.append("pantImages", file));

        try {
            const res = await fetch("http://localhost:5000/api/images/colors", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok && Array.isArray(data.combos)) {
                setCombos(data.combos.slice(0, 6));
            }
        } catch (err) {
            console.error("Image combo fetch failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 flex flex-col items-center w-full">
            <div className="w-full max-w-md space-y-6 mb-5">
                <div>
                    <label className="block mb-2 text-blue-400 font-medium text-lg">
                        Upload a maximum of 5 shirt images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(e, "shirt")}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-blue-400 font-medium text-lg">
                        Upload a maximum of 5 pant images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(e, "pant")}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Get Suggestions
                </button>
            </div>

            {loading && (
                <p className="text-sm text-blue-500 font-medium mb-4">
                    Processing images...
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
                                        style={{ backgroundColor: combo.shirtHex }}
                                    ></div>
                                    <span>
                                        {capitalize(combo.shirtColor)} Shirt
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <div
                                        className="w-5 h-5 rounded-full border"
                                        style={{ backgroundColor: combo.pantHex }}
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

export default ImageInputs;
