import React, { useState } from "react";
import "../App.css";

function Header({ mode, setMode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white text-red-500 shadow-sm sticky top-0 z-10">
            <div className="w-full px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-semibold">DressUp</h1>
                </div>

                <nav className="hidden md:flex space-x-6 mr-4">
                    <button
                        onClick={() => setMode("color")}
                        className={`text-sm font-medium ${
                            mode === "color"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-600"
                        } hover:text-blue-500 transition`}
                    >
                        Colors
                    </button>
                    <button
                        onClick={() => {
                            setMode("image");
                            alert(
                                "Please upload images that clearly show only the shirt or pant, with minimal background for better color detection."
                            );
                        }}
                        className={`text-sm font-medium ${
                            mode === "image"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-600"
                        } hover:text-blue-500 transition`}
                    >
                        Photos
                    </button>
                </nav>

                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <nav className="md:hidden px-4 pb-4 space-y-3 text-center">
                    <a
                        href="#"
                        className="block text-gray-600 hover:text-blue-500 transition"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="block text-gray-600 hover:text-blue-500 transition"
                    >
                        Colors
                    </a>
                    <a
                        href="#"
                        className="block text-gray-600 hover:text-blue-500 transition"
                    >
                        Photos
                    </a>
                </nav>
            )}
        </header>
    );
}

export default Header;
