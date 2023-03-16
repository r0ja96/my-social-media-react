import authApi from '../../api/authApi';
import logOutApi from '../../api/logOutApi';
import { useNavigate } from "react-router-dom";
import './NavBar.css';

function NavBar() {

    const navigate = useNavigate();

    const logOut = async () => {
        await logOutApi();
        navigate('/');
    }

    return (
        <nav id='NavBar'>
            <div id='searchNav'>
                <div>
                    <input id='NavBarBtn' type={'text'} />
                </div>
                <div>
                    <button>Search</button>
                </div>
            </div>
            <div id='logoNav'>
                <h1>My Social Media</h1>
            </div>
            <div id='optionNav'>
                <ul>
                    <li><button>My profile</button></li>
                    <li><button onClick={logOut}>Log Out</button></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;

