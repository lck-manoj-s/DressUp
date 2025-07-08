import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Suggestion from "./components/Suggestion";
import AddCombinations from "./components/AddCombinations";
import UserInputs from "./components/UserInputs"

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="min-h-screen flex">
                <div className="w-3/5 bg-gray-100 p-4">
                    <UserInputs />
                </div>

                <div className="w-2/5 flex flex-col">
                    <div className="h-1/2 bg-white border-b p-4">
                        <Suggestion />
                    </div>

                    <div className="h-1/2 bg-white p-4">
                        <AddCombinations />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;
