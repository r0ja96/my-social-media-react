import { useState } from "react";
import editCommentApi from "../../api/editCommentApi";

function EditComment({ commentID, comment, setEditPost, updatepost }) {

    const [commentInput, setCommentInput] = useState(comment);

    const editComment = async (event) => {
        event.preventDefault();
        const payload = {
            text: commentInput,
            commentID
        }
        const editCommentData = await editCommentApi(payload);
        updatepost(editCommentData);
        setEditPost(false);
    }

    return (
        <form onSubmit={editComment}>
            <div>
                <textarea onChange={(e) => { setCommentInput(e.target.value); }} value={commentInput} placeholder='Edit comment...' required></textarea>
            </div>
            <div>
                <button type="button" onClick={() => { setEditPost(false) }}>Cancel</button>
                < input type={'submit'} value='Edit comment' />
            </div>
        </form>
    );
}

export default EditComment;
