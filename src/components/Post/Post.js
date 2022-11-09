import Comment from '../Comment/Comment';
import './Post.css';

function Post() {
    return (
        <div id='post'>
            <div>
                <div className='post-header'>
                    <div>
                        <img className='profile-img-sm' src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000' />
                    </div>
                    <div>
                        <div>
                            <div><label>John Smith</label></div>
                            <div><label>Online</label></div>
                            <div><label>12:00 PM 01/01/22</label></div>
                        </div>
                        <div>
                            <div>
                                <a>Edit</a>
                            </div>
                            <div>
                                <a>Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        Qui mollit cillum ea tempor ut elit. Officia mollit amet eiusmod officia. Eu nulla deserunt nisi ad aute do incididunt fugiat. Eu sit ullamco proident ex laborum mollit in consectetur dolore fugiat ex dolore elit eiusmod.
                    </p>
                </div>
                <div className='post-image'>
                    <img src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000' />
                </div>
                <div>
                    <button>Like</button>
                    <h1>1</h1>
                </div>
                <Comment />
            </div>
        </div>
    );
}

export default Post;