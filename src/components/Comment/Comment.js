import './Comment.css';
import Profile from '../Profile/Profile';

function Comment() {
    return (
        <div className='post-coment'>
            <div>
                {false && <Profile />}
            </div>
            <div>
                <p>Nice Pic!!</p>
            </div>
        </div >
    );
}

export default Comment;