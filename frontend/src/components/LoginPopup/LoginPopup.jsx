import React, { useState } from "react";
import './LoginPopup.css';
import { fassets } from "../../frontend_assets/assets";

const LoginPopup = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Sign Up")
    return (
        <>
            <div className="login-popup">
                <form action="" className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currentState}</h2>
                        <img src={fassets.cross_icon} onClick={() => { setShowLogin(false) }} alt="" />
                    </div>
                    <div className="login-popup-inputs">
                        {currentState === "Login" ? <></> : <input type="text" placeholder="Your name" required />}

                        <input type="email" placeholder="Your email" required />
                        <input type="password" placeholder="Your password" required />
                    </div>
                    <button>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required /><p>By continuing, you agree to the terms of use & privacy policy.</p>
                    </div>
                    {currentState === "Sign Up" ? <p>Allready have an account? <span onClick={() => { setCurrentState("Login") }}>Login here</span></p> : <p>Create a new account? <span onClick={() => { setCurrentState("Sign Up") }}>Click here</span></p>
                    }
                </form>
            </div>
        </>
    )
}

export default LoginPopup;