import { Routes, Route } from "react-router-dom";

import LogInForm from "./pages/LogInForm";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LogInForm />} />
            </Routes>
        </div>
    );
}

export default App;