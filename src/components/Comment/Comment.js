import './Comment.css';
import Profile from '../Profile/Profile';
import DeleteCommentBtn from '../DeleteCommentBtn/DeleteCommentBtn';
import EditButton from '../EditButton/EditButton';
import EditComment from '../EditComment/EditComment';
import { useState } from 'react';

function Comment({ commentID, comment, profileData, updatePost }) {
    const [editPost, setEditPost] = useState(false);
    return (
        <div className='post-coment'>
            <div>
                <Profile profileData={profileData} profileType={profileData.isAccountComment ? 'postFriend' : 'postFriend'} />
                <div>
                    {profileData.isAccountComment && <EditButton setEdit={setEditPost} />}
                </div>
                <div>
                    {profileData.isAccountComment && <DeleteCommentBtn commentID={commentID} updatePost={updatePost} />}
                </div>
            </div>
            <div>
                {editPost ? <EditComment commentID={commentID} comment={comment} updatepost={updatePost} setEditPost={setEditPost} /> : <p>{comment}</p>}
            </div>
        </div >
    );
}

export default Comment;