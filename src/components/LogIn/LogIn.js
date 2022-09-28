import "./LogIn.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {

    const [signUp, setSignUp] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const birthdayInputRef = useRef();
    const navigate = useNavigate();

    const backToLogIn = () => {
        setSignUp(false);
        setError(false);
    }

    const goToSignUp = () => {
        setSignUp(true);
        setError(false);
    }

    const logInForm = ({ email, password }) => {
        if (email.value === 'admin@admin' && password.value === 'password') {
            navigate('/post');
        } else {
            setError(true);
        }
    }

    const signUpForm = ({ name, lastName, birthday, email, password }) => {
        console.log(name.value, lastName.value, birthday.value, email.value, password.value);
        if (email.value === 'admin@admin') {
            setError(true);
            setSuccess(false);
        } else {
            setError(false);
            setSuccess(true);
        }
    }

    const handleForm = (event) => {
        event.preventDefault();
        signUp === true ? signUpForm(event.target) : logInForm(event.target);
    }

    return (
        <div id="logIn">
            <form onSubmit={(event) => { handleForm(event); }}>
                <div className="mg-bottom-2">
                    <h1>My Social Media</h1>
                </div>
                <div>
                    {signUp === false ? <h2>Log In</h2> : <h2>Sign Up</h2>}
                </div>
                {signUp === true ?
                    <>
                        <div className="mg-top-bottom-2">
                            <input name="name" type="text" placeholder="Name" required />
                        </div>
                        <div>
                            <input name="lastName" className="mg-bottom-2" type="text" placeholder="Last Name" required />
                        </div>
                        <div>
                            <input name="birthday"
                                type="text"
                                ref={birthdayInputRef}
                                placeholder="birthday"
                                onFocus={() => (birthdayInputRef.current.type = "date")} required />
                        </div>
                    </> : null}
                <div className="mg-top-bottom-2">
                    <input name="email" type="email" placeholder="E-mail" required />
                </div>
                <div>
                    <input name="password" type="password" placeholder="Password" required />
                </div>
                <div className="height-2 padding-point-3">
                    <span className={error ? 'font-size-1-point-2 error-message' : 'display-none'}>{signUp ? 'Email is already registered' : 'Email or password incorrect'}</span>
                    {signUp ? <span className={success ? 'font-size-1-point-2 success-message' : 'display-none'}>Account created!!!</span> : null}
                </div>
                {signUp === true ?
                    <div className="mg-top-bottom-2 buttonDiv">
                        <input type="submit" value="Sign Up" />
                        <button type="button" onClick={backToLogIn}>Back To Log In</button>
                    </div>
                    : <div className="mg-top-bottom-2 buttonDiv">
                        <input type="submit" value="Log In" />
                        <button type="button" onClick={goToSignUp}>Go To Sign Up</button>
                    </div>}
            </form>
        </div >
    );
}

export default LogIn;