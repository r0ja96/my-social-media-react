import Profile from '../Profile/Profile';
import Comment from '../Comment/Comment';
import './Post.css';

function Post() {

    return (
        <div className='post'>
            <div>
                <Profile profileType={'post'} />
            </div>
            <div>
                <p>
                    Qui mollit cillum ea tempor ut elit. Officia mollit amet eiusmod officia. Eu nulla deserunt nisi ad aute do incididunt fugiat. Eu sit ullamco proident ex laborum mollit in consectetur dolore fugiat ex dolore elit eiusmod.
                </p>
            </div>
            <div className='post-image'>
                <img src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000' />
            </div>
            <div className='post-like'>
                <button>Like</button>
                <h1>1</h1>
            </div>
            <div className='post-comments '><h2>Comments</h2></div>
            <div>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
            <div className='post-add-comments'>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Comment</button>
                </div>
            </div>
        </div>
    );
}

export default Post;