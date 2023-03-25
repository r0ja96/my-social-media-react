import Profile from '../Profile/Profile';
import Comment from '../Comment/Comment';
import './Post.css';
import likeApi from '../../api/likeApi';
import addCommentApi from '../../api/addCommentApi';
import { useEffect, useState } from 'react';

function Post({ postData, profileData, comments }) {

    const { postID, text, imageUrl, like } = postData;
    const [commentComponents, setCommentComponents] = useState([]);

    useEffect(() => {
        const commentsArray = comments.map((data) => {
            const { _id, text, date, account } = data;
            const { name, lastName } = account;
            return <Comment key={_id} comment={text} profileData={{ _id: account._id, name: `${name} ${lastName}`, date: new Date(date).toLocaleString() }} profileType={'postFriend'} />;
        });

        setCommentComponents(commentsArray);
    }, []);

    const likePost = async () => {
        console.log('postID', postID);
        const likeData = await likeApi({ postID });
        console.log(likeData);
    }

    const addComment = async (event) => {
        event.preventDefault();
        const payload = {
            text: event.target.comment.value,
            postID
        }

        const commentData = await addCommentApi(payload);
        console.log(commentData);
    }

    return (
        <div className='post'>
            <div>
                <Profile profileType={'postFriend'} profileData={profileData} />
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
                {like.like ? <button>Liked</button> : <button onClick={likePost}>Like</button>}
                <h1>{like.likes}</h1>
            </div>
            <div className='post-comments'><h2>Comments</h2></div>
            <div>
                {commentComponents}
            </div>
            <div className='post-add-comments'>
                <form onSubmit={addComment}>
                    <div>
                        <textarea placeholder='Add a comment...' name="comment" required></textarea>
                    </div>
                    <div>
                        < input type={'submit'} value='Add comment' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Post;