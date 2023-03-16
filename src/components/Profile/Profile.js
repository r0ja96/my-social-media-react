import './Profile.css';
import addFriendApi from '../../api/addFriendApi';
import { useDispatch, useSelector } from 'react-redux';
import { lastAccounts, selectLastAccounts } from "../../store/reducers/lastAccountsReducer";
import { useNavigate } from "react-router-dom";

function Profile({ profileType, profileData }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let profileBtn = null;
    let description = null;

    const { name, _id } = profileData;

    const addFriend = async (friendID) => {
        const data = await addFriendApi({ friendID });
        if (data.status === "Success") {
            dispatch(lastAccounts());
        } else if (['Token expired', 'Missing token'].includes(data.message)) {
            navigate('/');
        }
    }

    switch (profileType) {
        case 'post':
            description = <>
                <div><label>{name}</label></div>
                <div><label>Online</label></div>
                <div><label>12:00 PM 01/01/22</label></div>
            </>
            profileBtn = (
                <>
                    <div>
                        <a>Edit</a>
                    </div>
                    <div>
                        <a>Delete</a>
                    </div>
                </>);
            break;
        case 'add':
            description = <div><label>{name}</label></div>;
            profileBtn = (
                <>
                    <button style={{ 'width': '50px' }} onClick={() => { addFriend(_id) }}>Add</button>
                </>)
            break;
        case 'friend':
            description = <>
                <div><label>{name}</label></div>
                <div><label>Online</label></div>
            </>
    }

    return (
        <div className='profile'>
            <div>
                <img className='profile-img-sm' src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000' />
            </div>
            <div>
                <div>
                    {description}
                </div>
                <div>
                    {profileBtn}
                </div>
            </div>
        </div>
    )
}

export default Profile;