import Profile from '../Profile/Profile';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import authApi from '../../api/authApi';
import lastAccountsApi from '../../api/lastAccountsApi';
import { selectLastAccounts } from '../../store/reducers/lastAccountsReducer';
import { useSelector } from 'react-redux';

function Profiles({ profileType }) {

    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();
    const lastAccounts = useSelector(selectLastAccounts);


    useEffect(() => {
        console.log('lastAccount', lastAccounts);
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
                //navigate('/');
            }
        }

        fetch();
    }, [lastAccounts]);

    return <>{profile}</>
}

export default Profiles;