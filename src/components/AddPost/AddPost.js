import { useState } from 'react';
import addPostApi from '../../api/addPostApi';
import './AddPost.css';

function AddPost() {

    const [imageSrc, setImageSrc] = useState(null);

    const displayImage = (e) => {
        const blob = e.target.files[0];
        if (blob) {
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    }

    const addPost = async (event) => {

        event.preventDefault();
        const payload = {
            text: event.target.postText.value,
            image: null
        }

        const formData = new FormData();
        if (imageSrc) {
            const image = await fetch(imageSrc);
            const blob = await image.blob();
            console.log(blob);
            formData.append("image", blob);
            const blobText = await blob.text();
            payload.image = blobText;
        }

        formData.append("text", event.target.postText.value);


        await addPostApi(formData);

    }

    return (
        <div className="addPost">
            <form onSubmit={addPost}>
                <textarea name="postText" placeholder='Add a post...' rows={4} required></textarea>
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