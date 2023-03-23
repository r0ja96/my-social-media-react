import Profile from '../Profile/Profile';
import Comment from '../Comment/Comment';
import './Post.css';

function Post({ postData, profileData }) {

    const { text } = postData;

    return (
        <div className='post'>
            <div>
                {true && <Profile profileType={'postFriend'} profileData={profileData} />}
            </div>
            <div>
                <p>
                    {text}
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