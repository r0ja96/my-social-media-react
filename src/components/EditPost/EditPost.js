import editPostApi from "../../api/editPostApi";
import { useState } from "react";

function EditPost({ postID, updatePost, setEditPost, text, imageSrc }) {

    const [editPostText, setEditpostText] = useState(text);
    const [editImageSrc, setEditImageSrc] = useState(imageSrc);

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
    }

    const displayImage = (e) => {
        const blob = e.target.files[0];
        if (blob) {
            setEditImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
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
    )
}

export default EditPost;