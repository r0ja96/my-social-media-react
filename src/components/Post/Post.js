import Profile from '../Profile/Profile';
import Comment from '../Comment/Comment';
import './Post.css';
import likeApi from '../../api/likeApi';
import unlikeApi from '../../api/unlikeApi';
import addCommentApi from '../../api/addCommentApi';
import getPostApi from '../../api/getPostApi';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Post({ postData, profileData, comments }) {

    const { postID, text, imageUrl, like } = postData;

    const [postText, setPostText] = useState(text);
    const [isLike, setIslike] = useState(like.like);
    const [likes, setLikes] = useState(like.likes);
    const [imageSrc, setImageSrc] = useState(imageUrl);
    const [profileDataHook, setProfileDataHook] = useState(profileData);
    const [commentInput, setCommentInput] = useState('');
    const [commentComponents, setCommentComponents] = useState([]);

    const navigate = useNavigate();

    const mapComments = (commentsData) => {
        const commentsArr = commentsData.map((data) => {
            const { _id, text, date, account } = data;
            const { name, lastName } = account;
            return <Comment key={_id} comment={text} profileData={{ _id: account._id, name: `${name} ${lastName}`, date: new Date(date).toLocaleString() }} profileType={'postFriend'} />;
        });

        setCommentComponents(commentsArr);
    }

    const updatePost = async ({ message, status }) => {
        if (status === "Success") {
            const getPostData = await getPostApi(postID);
            if (getPostData.status === 'Success') {
                getPostData.data.forEach(d => {
                    console.log(d)
                    const { _id, text, postDate, like, image, account } = d;
                    const { name, lastName } = account;

                    let date = new Date(postDate);
                    date = date.toLocaleString();

                    setProfileDataHook({ _id: account._id, name: `${name} ${lastName}`, date });
                    setImageSrc(image ? `http://localhost:4400/image/${account._id}/${image}` : null);
                    setLikes(like.likes);
                    setIslike(like.like);
                    setPostText(text);
                    mapComments(d.comments);
                    setCommentInput('');
                })
            } else if (['Token expired', 'Missing token'].includes(message)) {
                navigate('/');
            }
        } else if (['Token expired', 'Missing token'].includes(message)) {
            navigate('/');
        }
    }

    useEffect(() => {
        mapComments(comments);
    }, []);

    const likePost = async () => {
        const likeData = await likeApi({ postID });
        updatePost(likeData);
    }

    const unlikePost = async () => {
        const unlikeData = await unlikeApi({ postID });
        console.log(unlikeApi);
        updatePost(unlikeData);
    }

    const addComment = async (event) => {
        event.preventDefault();
        const payload = {
            text: commentInput,
            postID
        }

        const commentData = await addCommentApi(payload);
        updatePost(commentData);
    }

    return (
        <div className='post'>
            <div>
                <Profile profileType={'postFriend'} profileData={profileDataHook} />
            </div>
            <div>
                <p>
                    {postText}
                </p>
            </div>
            <div className='post-image'>
                {imageSrc && <img src={imageSrc} />}
            </div>
            <div className='post-like'>
                {isLike ? <button onClick={unlikePost}>Liked</button> : <button onClick={likePost}>Like</button>}
                <h1>{likes}</h1>
            </div>
            <div className='post-comments'><h2>Comments</h2></div>
            <div>
                {commentComponents}
            </div>
            <div className='post-add-comments'>
                <form onSubmit={addComment}>
                    <div>
                        <textarea onChange={(e) => { setCommentInput(e.target.value); }} value={commentInput} placeholder='Add a comment...' name="comment" required></textarea>
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