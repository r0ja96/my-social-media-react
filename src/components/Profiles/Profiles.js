import Profile from '../Profile/Profile';
import { useEffect, useState } from 'react';
import authApi from '../../api/authApi';
import lastAccountsApi from '../../api/lastAccountsApi';

function Profiles({ profileType }) {

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const authData = await authApi();
            const lastAccountsData = await lastAccountsApi(authData.data.accessToken);
            const profileArray = lastAccountsData.data.map((d) => {
                const { _id, name, lastName } = d;
                return <Profile key={_id} profileType={profileType} profileData={{ name: `${name} ${lastName}` }} />
            });

            setProfile(profileArray)
        }

        fetch();
    }, []);

    return <>{profile}</>
}

export default Profiles;