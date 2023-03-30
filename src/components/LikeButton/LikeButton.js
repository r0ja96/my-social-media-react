import likeApi from '../../api/likeApi';

function LikeButton({ postID, updatePost }) {

    const likePost = async () => {
        const likeData = await likeApi({ postID });
        updatePost(likeData);
    }

    return <button onClick={likePost}>Like</button>

}

export default LikeButton;