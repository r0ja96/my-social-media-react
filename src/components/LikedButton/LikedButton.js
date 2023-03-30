import unlikeApi from "../../api/unlikeApi";

function LikedButton({ postID, updatePost }) {

    const unlikePost = async () => {
        const unlikeData = await unlikeApi({ postID });
        updatePost(unlikeData);
    }

    return <button onClick={unlikePost}>Liked</button>
}

export default LikedButton;