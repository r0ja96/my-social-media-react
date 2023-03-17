import NavBar from "../../components/NavBar/NavBar";
import Post from "../../components/Post/Post";
import Profile from "../../components/Profile/Profile";
import Profiles from "../../components/Profiles/Profiles";
import AddPost from "../../components/AddPost/AddPost";

import { useDispatch, useSelector } from 'react-redux';
import { lastAccounts, selectLastAccounts } from "../../store/reducers/lastAccountsReducer";
import { friends, selectFriends } from "../../store/reducers/friendsReducer";

import './PostPage.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function PostPage() {

    const [profileAdd, setProfileAdd] = useState([]);
    const [profileFriend, setProfileFriend] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lastAccountsData = useSelector(selectLastAccounts);
    const friendsData = useSelector(selectFriends);

    useEffect(() => {
        dispatch(lastAccounts());
        dispatch(friends());
    }, []);

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

    useEffect(()=>{
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
    },[friendsData])


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