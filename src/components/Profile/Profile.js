import './Profile.css';
import addFriendApi from '../../api/addFriendApi';

function Profile({ profileType, profileData }) {

    let profileBtn = null;
    let description = null;

    const { name, _id } = profileData;

    const addFriend = async (friendID) => {
        console.log('entro');
        const data = await addFriendApi({ friendID });
        console.log(data);
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