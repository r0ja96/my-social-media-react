import NavBar from "../../components/NavBar/NavBar";
import Post from "../../components/Post/Post";

import './PostPage.css'

function PostPage() {
    return (
        <div>
            <NavBar />
            <div id="PostPage">
                <div></div>
                <div><Post /></div>
                <div></div>
            </div>
        </div>
    )
}

export default PostPage;