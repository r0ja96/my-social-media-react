import Profile from '../Profile/Profile';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authApi from '../../api/authApi';
import lastAccountsApi from '../../api/lastAccountsApi';

function Profiles({ profileType }) {

    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            //const authData = await authApi();
            const lastAccountsData = await lastAccountsApi();
            if (lastAccountsData.status !== "Failed") {

                const profileArray = lastAccountsData.data.map((d) => {
                    const { _id, name, lastName } = d;
                    return <Profile key={_id} profileType={profileType} profileData={{ _id, name: `${name} ${lastName}` }} />
                });

                setProfile(profileArray)
            } else if (['Token expired', 'Missing token'].includes(lastAccountsData.message)) {
                navigate('/');
            }
        }

        fetch();
    }, []);

    return <>{profile}</>
}

export default Profiles;