import "./LogIn.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import signUpApi from "../../api/signUpApi";
import logInApi from "../../api/logInApi";

function LogIn() {
    const initialValue = { status: "none", message: "" }
    const [signUp, setSignUp] = useState(false);
    const [message, setMessage] = useState(initialValue);
    const birthdayInputRef = useRef();
    const navigate = useNavigate();

    const backToLogIn = () => {
        setSignUp(false);
        setMessage(initialValue);
    }

    const goToSignUp = () => {
        setSignUp(true);
        setMessage(initialValue);
    }

    const logInForm = async ({ email, password }) => {
        const response = await logInApi({
            email: email.value,
            password: password.value
        });
        if (response.status === 'Success') {
            document.cookie = `token=${response.data.token}; max-age=${604800}; path=/; samesite=strict`;
            navigate('/post');
        } else {
            setMessage(response);
        }
    }

    const signUpForm = async ({ name, lastName, birthday, email, password }) => {
        const response = await signUpApi({
            name: name.value,
            lastName: lastName.value,
            birthday: birthday.value,
            email: email.value,
            password: password.value
        });

        setMessage(response);
    }

    const handleForm = async (event) => {
        event.preventDefault();
        signUp === true ? await signUpForm(event.target) : await logInForm(event.target);
    }

    useEffect(() => {
        if (document.cookie) {
            navigate('/post');
        }
    }, [])

    return (
        <div id="logIn">
            <form onSubmit={async (event) => { await handleForm(event); }}>
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
                    <span className={
                        'font-size-1-point-2 ' + ((message.status === "none") ?
                            'display-none' :
                            (message.status === "Failed") ? 'error-message' : 'success-message')}>{message.message}</span>
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