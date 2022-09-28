import { Routes, Route } from "react-router-dom";

import LogInPage from "./pages/LogInPage/LogInPage";
import PostPage from "./pages/PostPage/PostPage";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LogInPage />} />
                <Route path="/post" element={<PostPage />} />
            </Routes>
        </div>
    );
}

export default App;