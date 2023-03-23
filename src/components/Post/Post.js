import Profile from '../Profile/Profile';
import Comment from '../Comment/Comment';
import './Post.css';

function Post({ postData, profileData }) {

    const { text, imageUrl } = postData;

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
                {imageUrl && <img src={imageUrl} />}
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