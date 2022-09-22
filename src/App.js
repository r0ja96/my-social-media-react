import { Routes, Route } from "react-router-dom";

import LogInPage from "./pages/LogInPage/LogInPage";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LogInPage />} />
            </Routes>
        </div>
    );
}

export default App;