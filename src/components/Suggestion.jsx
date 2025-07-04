import { useEffect, useState } from "react";

function Suggestion() {
    const [systemCombo, setSystemCombo] = useState(null);
    const [userCombo, setUserCombo] = useState(null);
    const [showCombos, setShowCombos] = useState(false);

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
            <h2 className="text-lg text-center font-semibold mb-4">
                Wanna look different today..
            </h2>

            <button
                onClick={() => setShowCombos(true)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Check it out
            </button>

            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-gray-700">
                        Public Suggestion
                    </h3>
                    {showCombos && userCombo && (
                        <p className="mt-1">
                            {userCombo.shirtColor} Shirt + {userCombo.pantColor}{" "}
                            Pant
                        </p>
                    )}
                </div>

                <div>
                    <h3 className="font-bold text-gray-700">
                        System Generated Suggestion
                    </h3>
                    {showCombos && systemCombo && (
                        <p className="mt-1">
                            {systemCombo.shirtColor} Shirt +{" "}
                            {systemCombo.pantColor} Pant
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Suggestion;
