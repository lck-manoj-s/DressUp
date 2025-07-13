import ColorInputs from "./ColorInputs";
import ImageInputs from "./ImageInputs";

function UserInputs({mode, setMode}) {

    return (
        <div className="w-full px-4">
            <div className="p-3 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded text-sm text-center mb-5">
                ⚠️ All colors may not be perfectly accurate. Suggestions might
                vary based on personal preferences.
            </div>
            <h2 className="text-lg text-center font-semibold mb-5 text-blue-600">
                Try with what you have
            </h2>
            <div className="w-full flex mb-10 justify-center">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setMode("color")}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                            mode === "color"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        Enter Colors
                    </button>
                    <button
                        onClick={() => {
                            setMode("image")
                            alert("Please upload images that clearly show only the shirt or pant, with minimal background for better color detection.");

                        }}
                        className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                            mode === "image"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        Upload Images
                    </button>
                </div>
            </div>

            {/* Dynamic content section */}
            <div className="w-full">
                {mode === "color" && <ColorInputs />}
                {mode === "image" && <ImageInputs />}
            </div>
        </div>
    );
}

export default UserInputs;
