import "./LogIn.css";
import { useState, useRef } from "react";

function LogIn() {

    const [signUp, setSignUp] = useState(false);
    const birthdayInputRef = useRef();

    const logInForm = ({ email, password }) => {
        console.log(email.value, password.value);
    }

    const signUpForm = ({ name, lastName, birthday, email, password }) => {
        console.log(name.value, lastName.value, birthday.value, email.value, password.value);
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
                {signUp === true ?
                    <div className="mg-top-bottom-2 buttonDiv">
                        <input type="submit" value="Sign Up" />
                        <button type="button" onClick={() => { setSignUp(false) }}>Back To Log In</button>
                    </div>
                    : <div className="mg-top-bottom-2 buttonDiv">
                        <input type="submit" value="Log In" />
                        <button type="button" onClick={() => { setSignUp(true) }}>Go To Sign Up</button>
                    </div>}
            </form>
        </div >
    );
}

export default LogIn;