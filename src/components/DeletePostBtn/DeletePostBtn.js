import deletePostApi from "../../api/deletePostApi";
import { useDispatch, useSelector } from 'react-redux';
import { friendsPosts, selectFriendsPosts } from "../../store/reducers/friendsPostsReducer";


function DeletePostBtn({ postID }) {

    const dispatch = useDispatch();

    const deletePost = async () => {
        const deletePostData = await deletePostApi({ postID });
        dispatch(friendsPosts());
    }

    return <a onClick={deletePost}>Delete</a>
}

export default DeletePostBtn;