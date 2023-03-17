import { useState } from 'react';
import './AddPost.css';

function AddPost() {

    const [imageSrc, setImageSrc] = useState(null);

    const displayImage = (e) => {
        const blob = e.target.files[0];
        if (blob) {
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        } else {
            setImageSrc(null);
        }
    }

    return (
        <div className="addPost">
            <textarea placeholder='Add a post...' rows={4}></textarea>
            {imageSrc ? <img style={{ "width": "100%" }} src={imageSrc} /> : imageSrc}
            <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                <label style={{ "textAlign": "center" }} className='social-media-btn'> Add image
                    <input style={{ "display": "none" }} type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { displayImage(e); }} />
                </label>
                <button>Post</button>
            </div>
        </div>
    );
}

export default AddPost;