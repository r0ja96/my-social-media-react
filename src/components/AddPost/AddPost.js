import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import addPostApi from '../../api/addPostApi';
import { friendsPosts } from "../../store/reducers/friendsPostsReducer";
import './AddPost.css';

function AddPost({imgSrc, text, editPost}) {

    const [imageSrc, setImageSrc] = useState(imgSrc?imgSrc:null);
    const [postText, setPostText] = useState(text?text:'');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const displayImage = (e) => {
        const blob = e.target.files[0];
        if (blob) {
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    }

    const addPost = async (event) => {

        event.preventDefault();

        const formData = new FormData();
        if (imageSrc) {
            const image = await fetch(imageSrc);
            const blob = await image.blob();
            formData.append("image", blob);
        }

        formData.append("text", postText);


        const addPostData = await addPostApi(formData);
        const { message, data, status } = addPostData;
        if (status === "Success") {
            setImageSrc(null);
            setPostText('');
            dispatch(friendsPosts());
        } else if (['Token expired', 'Missing token'].includes(message)) {
            navigate('/');
        }
    }

    return (
        <div className="addPost">
            <form onSubmit={editPost?editPost:addPost}>
                <textarea onChange={(e) => { setPostText(e.target.value) }} name="postText" placeholder='Add a post...' rows={4} value={postText} required></textarea>
                {imageSrc ? <img style={{ "width": "100%" }} src={imageSrc} /> : imageSrc}
                <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                    <div style={{ "display": "flex", "gap": "1rem" }}>
                        <label style={{ "textAlign": "center" }} className='social-media-btn'> Add image
                            <input name='file' style={{ "display": "none" }} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { displayImage(e); }} />
                        </label>
                        {imageSrc ? <button type='button' onClick={() => { setImageSrc(null) }}>Remove</button> : imageSrc}
                    </div>
                    <input type='submit' value='Post' />
                </div>
            </form>
        </div>
    );
}

export default AddPost;