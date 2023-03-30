import Profile from '../Profile/Profile';
import Comments from '../Comments/Comments';
import AddComment from '../AddComment/AddComment';
import LikeButton from '../LikeButton/LikeButton';
import LikedButton from '../LikedButton/LikedButton';
import DeletePostBtn from '../DeletePostBtn/DeletePostBtn';
import EditPost from '../EditPost/EditPost';
import EditButton from '../EditButton/EditButton';
import './Post.css';
import getPostApi from '../../api/getPostApi';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Post({ postData, profileData, comments }) {

    const { postID, text, imageUrl, like } = postData;

    const [editPost, setEditPost] = useState(false);
    const [postText, setPostText] = useState(text);
    const [isLike, setIslike] = useState(like.like);
    const [likes, setLikes] = useState(like.likes);
    const [imageSrc, setImageSrc] = useState(imageUrl);
    const [profileDataHook, setProfileDataHook] = useState(profileData);
    const [commentsData, setCommentsData] = useState(comments);

    const navigate = useNavigate();

    const updatePost = async ({ message, status }) => {
        if (status === "Success") {
            const getPostData = await getPostApi(postID);
            if (getPostData.status === 'Success') {
                getPostData.data.forEach(d => {

                    const { _id, text, postDate, like, image, account } = d;
                    const { name, lastName, isAccountPost } = account;

                    let date = new Date(postDate);
                    date = date.toLocaleString();

                    setProfileDataHook({ _id: account._id, name: `${name} ${lastName}`, date, isAccountPost });
                    setImageSrc(image ? `http://localhost:4400/image/${account._id}/${image}` : null);
                    setLikes(like.likes);
                    setIslike(like.like);
                    setPostText(text);
                    setCommentsData(d.comments);
                })
            } else if (['Token expired', 'Missing token'].includes(message)) {
                navigate('/');
            }
        } else if (['Token expired', 'Missing token'].includes(message)) {
            navigate('/');
        }
    }

    useEffect(() => {
        setProfileDataHook(profileData);
        setImageSrc(imageUrl);
        setLikes(like.likes);
        setIslike(like.like);
        setPostText(text);
        setCommentsData(comments);
    }, [postData]);

    return (
        <div className='post'>
            <div>
                <Profile profileType={'postFriend'} profileData={profileDataHook} />
                <div>
                    {profileDataHook.isAccountPost && <EditButton setEdit={setEditPost} />}
                    {profileDataHook.isAccountPost && <DeletePostBtn postID={postID} />}
                </div>
            </div>
            {editPost ?
                <EditPost postID={postID} updatePost={updatePost} setEditPost={setEditPost} text={postText} imageSrc={imageSrc} />
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
                        {isLike ? <LikedButton postID={postID} updatePost={updatePost} /> : <LikeButton postID={postID} updatePost={updatePost} />}
                        <h1>{likes}</h1>
                    </div>
                </>
            }
            <div className='post-comments'><h2>Comments</h2></div>
            <div>
                <Comments comments={commentsData} updatePost={updatePost} />
            </div>
            <div className='post-add-comments'>
                <AddComment postID={postID} updatePost={updatePost} />
            </div>
        </div>
    );
}

export default Post;