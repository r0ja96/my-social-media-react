import Profile from '../Profile/Profile';
import Comment from '../Comment/Comment';
import './Post.css';
import likeApi from '../../api/likeApi';
import unlikeApi from '../../api/unlikeApi';
import editPostApi from '../../api/editPostApi';
import addCommentApi from '../../api/addCommentApi';
import getPostApi from '../../api/getPostApi';
import deletePostApi from '../../api/deletePostApi';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { friendsPosts, selectFriendsPosts } from "../../store/reducers/friendsPostsReducer";


function Post({ postData, profileData, comments }) {

    const { postID, text, imageUrl, like } = postData;

    const [editPost, setEditPost] = useState(false);
    const [editPostText, setEditpostText] = useState(text);
    const [postText, setPostText] = useState(text);
    const [isLike, setIslike] = useState(like.like);
    const [likes, setLikes] = useState(like.likes);
    const [imageSrc, setImageSrc] = useState(imageUrl);
    const [editImageSrc, setEditImageSrc] = useState(imageUrl);
    const [profileDataHook, setProfileDataHook] = useState(profileData);
    const [commentInput, setCommentInput] = useState('');
    const [commentComponents, setCommentComponents] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    const { name, lastName, isAccountPost } = account;

                    let date = new Date(postDate);
                    date = date.toLocaleString();

                    setProfileDataHook({ _id: account._id, name: `${name} ${lastName}`, date, isAccountPost });
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

    const deletePost = async () => {
        const deletePostData = await deletePostApi({ postID });
        dispatch(friendsPosts());
    }

    const clickEditPostFun = async () => {
        setEditPost(true);
        setEditpostText(postText);
        setEditImageSrc(imageSrc);
    }

    const displayImage = (e) => {
        const blob = e.target.files[0];
        if (blob) {
            setEditImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    }

    const editPostFun = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        if (editImageSrc) {
            const image = await fetch(editImageSrc);
            const blob = await image.blob();
            formData.append("image", blob);
        }
        formData.append("postID", postID);
        formData.append("text", editPostText);

       const editPostData = await editPostApi(formData);
       await updatePost(editPostData);
       setEditPost(false);

        /*const addPostData = await addPostApi(formData);
        const { message, data, status } = addPostData;
        if (status === "Success") {
            setImageSrc(null);
            setPostText('');
            dispatch(friendsPosts());
        } else if (['Token expired', 'Missing token'].includes(message)) {
            navigate('/');
        }*/
    }

    return (
        <div className='post'>
            <div>
                <Profile profileType={profileDataHook.isAccountPost ? 'post' : 'postFriend'} profileData={profileDataHook} deleteFun={deletePost} editFun={clickEditPostFun} />
            </div>
            {editPost ?
                <>
                    <form onSubmit={editPostFun}>
                        <textarea onChange={(e) => { setEditpostText(e.target.value) }} value={editPostText} required></textarea>
                        {editImageSrc ? <img style={{ "width": "100%" }} src={editImageSrc} /> : null}
                        <label style={{ "textAlign": "center" }} className='social-media-btn'> Add image
                            <input name='file' style={{ "display": "none" }} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { displayImage(e); }} />
                        </label>
                        {editImageSrc ? <button type='button' onClick={() => { setEditImageSrc(null) }}>Remove</button> : editImageSrc}
                        <input type='submit' value='Edit post' />
                        <button onClick={() => { setEditPost(false); }} type='button'>cancel</button>
                    </form>
                </>
                : <>
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
                </>
            }
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