import { useEffect, useState } from "react";

function Suggestion() {
    const [systemCombo, setSystemCombo] = useState(null);
    const [userCombo, setUserCombo] = useState(null);
    const [showCombos, setShowCombos] = useState(false);

    const capitalizeWords = (str) => 
        str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    useEffect(() => {
        fetch("http://localhost:5000/api/combinations")
            .then((res) => res.json())
            .then((data) => {
                const system = data.filter((c) => c.source === "system");
                const user = data.filter((c) => c.source === "user");

                if (system.length > 0)
                    setSystemCombo(
                        system[Math.floor(Math.random() * system.length)]
                    );
                if (user.length > 0)
                    setUserCombo(user[Math.floor(Math.random() * user.length)]);
            });
    }, []);

    return (
        <div>
            <h2 className="text-lg text-center font-semibold mb-3 text-blue-600">
                Wanna look different today..
            </h2>

            <button
                onClick={() => setShowCombos(true)}
                className="mb-4 mx-auto block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Check it out
            </button>

            <div className="space-y-6">
                <div className="p-4 border rounded shadow-sm bg-white">
                    <h3 className="font-bold text-blue-400 mb-2">
                        Public Suggestion
                    </h3>
                    {showCombos && userCombo && (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <span
                                    className="inline-block w-4 h-4 rounded-full border"
                                    style={{
                                        backgroundColor: userCombo.shirtHex,
                                    }}
                                ></span>
                                <span className="text-gray-800">
                                    {capitalizeWords(userCombo.shirtColor)} Shirt
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span
                                    className="inline-block w-4 h-4 rounded-full border"
                                    style={{
                                        backgroundColor: userCombo.pantHex,
                                    }}
                                ></span>
                                <span className="text-gray-800">
                                    {capitalizeWords(userCombo.pantColor)} Pant
                                </span>
                            </div>
                        </div>
                    )}
                </div>

               
                <div className="p-4 border rounded shadow-sm bg-white">
                    <h3 className="font-bold text-blue-400 mb-2">
                        AI Generated Suggestion
                    </h3>
                    {showCombos && systemCombo && (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <span
                                    className="inline-block w-4 h-4 rounded-full border"
                                    style={{
                                        backgroundColor: systemCombo.shirtHex,
                                    }}
                                ></span>
                                <span className="text-gray-800">
                                    {capitalizeWords(systemCombo.shirtColor)} Shirt
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span
                                    className="inline-block w-4 h-4 rounded-full border"
                                    style={{
                                        backgroundColor: systemCombo.pantHex,
                                    }}
                                ></span>
                                <span className="text-gray-800">
                                    {capitalizeWords(systemCombo.pantColor)} Pant
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Suggestion;
