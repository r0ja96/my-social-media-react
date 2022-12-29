import NavBar from "../../components/NavBar/NavBar";
import Post from "../../components/Post/Post";
import Profile from "../../components/Profile/Profile";

import './PostPage.css'

function PostPage() {
    return (
        <div>
            <NavBar />
            <div id="PostPage">
                <div className="post-sidebar">
                    <div>
                        <h2>New People</h2>
                    </div>
                    <div>
                        <Profile profileType={'add'} />
                        <Profile profileType={'add'} />
                    </div>
                </div>
                <div id="post">
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="post-sidebar">
                    <div>
                        <h2>My Friends</h2>
                    </div>
                    <div>
                        <Profile profileType={'friend'} />
                        <Profile profileType={'friend'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage;