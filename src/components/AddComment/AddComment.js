import { useState } from "react";
import addCommentApi from "../../api/addCommentApi";


function AddComment({ postID, updatePost }) {

    const [commentInput, setCommentInput] = useState('');

    const addComment = async (event) => {
        event.preventDefault();
        const payload = {
            text: commentInput,
            postID
        }

        const commentData = await addCommentApi(payload);
        updatePost(commentData);
        setCommentInput('');
    }

    return (
        <form onSubmit={addComment}>
            <div>
                <textarea onChange={(e) => { setCommentInput(e.target.value); }} value={commentInput} placeholder='Add a comment...' name="comment" required></textarea>
            </div>
            <div>
                < input type={'submit'} value='Add comment' />
            </div>
        </form>
    )
}

export default AddComment;