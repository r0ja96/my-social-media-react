import NavBar from "../../components/NavBar/NavBar";
import Post from "../../components/Post/Post";
import Profile from "../../components/Profile/Profile";
import Profiles from "../../components/Profiles/Profiles";
import AddPost from "../../components/AddPost/AddPost";

import { useDispatch, useSelector } from 'react-redux';
import { lastAccounts, selectLastAccounts } from "../../store/reducers/lastAccountsReducer";
import { friends, selectFriends } from "../../store/reducers/friendsReducer";
import { friendsPosts, selectFriendsPosts } from "../../store/reducers/friendsPostsReducer";

import './PostPage.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import getFriendsPostApi from "../../api/getFriendsPostApi";


function PostPage() {

    const [profileAdd, setProfileAdd] = useState([]);
    const [profileFriend, setProfileFriend] = useState([]);
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lastAccountsData = useSelector(selectLastAccounts);
    const friendsData = useSelector(selectFriends);
    const friendsPostsData = useSelector(selectFriendsPosts);

    useEffect(() => {
        dispatch(lastAccounts());
        dispatch(friends());
        dispatch(friendsPosts());
    }, []);

    useEffect(() => {
        const { message, data, status } = friendsPostsData;

        if (status === "Success") {
            const postArray = data.map((d) => {
                const { _id, text, image, like, postDate, account, comments } = d;
                const { name, lastName, isAccountPost } = account;

                let date = new Date(postDate);
                date = date.toLocaleString();

                return (
                    <Post
                        key={_id}
                        comments={comments}
                        postData={{ like, postID: _id, text, imageUrl: image ? `http://localhost:4400/image/${account._id}/${image}` : null }}
                        profileData={{ name: `${name} ${lastName}`, date, isAccountPost }}
                    />
                );
            });

            setPost(postArray)
        } else if (['Token expired', 'Missing token'].includes(message)) {
            navigate('/');
        }

    }, [friendsPostsData]);

    useEffect(() => {
        const { message, data, status } = lastAccountsData;
        if (status === "Success") {

            const profileArray = data.map((d) => {
                const { _id, name, lastName } = d;
                return <Profile key={_id} profileType={'add'} profileData={{ _id, name: `${name} ${lastName}` }} />
            });

            setProfileAdd(profileArray)
            dispatch(friends());
        } else if (['Token expired', 'Missing token'].includes(message)) {
            navigate('/');
        }

    }, [lastAccountsData]);

    useEffect(() => {
        const { message, data, status } = friendsData;
        if (status === "Success") {

            const profileArray = data.map((d) => {
                const { _id, name, lastName } = d;
                return <Profile key={_id} profileType={'friend'} profileData={{ _id, name: `${name} ${lastName}` }} />
            });

            setProfileFriend(profileArray);
        } else if (['Token expired', 'Missing token'].includes(message)) {
            navigate('/');
        }
    }, [friendsData])


    return (
        <div>
            <NavBar />
            <div id="PostPage">
                <div className="post-sidebar">
                    <div>
                        <h2>New People</h2>
                    </div>
                    <div>
                        {profileAdd}
                    </div>
                </div>
                <div id="post">
                    <AddPost />
                    {post}
                </div>
                <div className="post-sidebar">
                    <div>
                        <h2>My Friends</h2>
                    </div>
                    <div>
                        {profileFriend}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage;