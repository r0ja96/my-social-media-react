import './Comment.css';
import Profile from '../Profile/Profile';

function Comment({ comment, profileData, profileType }) {
    return (
        <div className='post-coment'>
            <div>
                <Profile profileData={profileData} profileType={profileType} />
            </div>
            <div>
                <p>{comment}</p>
            </div>
        </div >
    );
}

export default Comment;