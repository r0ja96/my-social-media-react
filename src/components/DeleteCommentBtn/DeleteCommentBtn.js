import deleteCommentApi from "../../api/deleteCommentApi";

function DeleteCommentBtn({ commentID, updatePost }) {

    const deleteComment = async () => {
        const deleteCommentData = await deleteCommentApi({ commentID });
        updatePost(deleteCommentData);
    }

    return (<a onClick={deleteComment}>Delete</a>)
}

export default DeleteCommentBtn;