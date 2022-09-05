import "./LogInForm.css";

function LogInForm() {
    return (
        <div id="logInFormDiv">
            <form id="logInForm" >
                <div className="logInFormComponets logInFormHeader">
                    <h1>My Social Media</h1>
                </div>
                <div className="logInFormComponets logInFormInput">
                    <div>
                        <label>E-Mail: </label>
                    </div>
                    <div>
                        <input type={"text"} />
                    </div>
                </div>
                <div className="logInFormComponets logInFormInput">
                    <div>
                        <label>Password: </label>
                    </div>
                    <div>
                        <input type={"text"}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LogInForm;