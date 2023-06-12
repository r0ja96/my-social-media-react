import { Routes, Route } from "react-router-dom";

import LogInPage from "./pages/LogInPage/LogInPage";
import PostPage from "./pages/PostPage/PostPage";

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Routes>
                <Route path="/" element={<LogInPage />} />
                <Route path="/post" element={<PostPage />} />
            </Routes>
        </div>
    );
}

export default App;