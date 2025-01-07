import React, { useContext, useState } from "react";
import './LoginPopup.css';
import { fassets } from "../../frontend_assets/assets";
import { DochakiContext } from "../Context/Contact";
import { toast } from "react-toastify";
import GoogleSignup from "./GoogleSignup";

const LoginPopup = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Sign Up");
    const { url, setToken } = useContext(DochakiContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async () => {
        let newUrl = `${url}/api/user/${currentState === "Login" ? "login" : "register"}`;

        try {
            const response = await fetch(newUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const jsonResponse = await response.json();

            if (!jsonResponse.success || !response.ok) {
                toast.error(jsonResponse.message);
            } else if (jsonResponse.success) {
                toast.success(jsonResponse.message);
                // localStorage.setItem("token", jsonResponse.token);
                setToken(jsonResponse.token);
                localStorage.setItem("token", jsonResponse.token);
                setShowLogin(false);
            }
            setData({ name: "", email: "", password: "" });
        } catch (error) {
            toast.error(error);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="login-popup">
            <form onSubmit={handleSubmit} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={fassets.cross_icon} onClick={() => setShowLogin(false)} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Sign Up" &&
                        <input
                            type="text"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder="Your name"
                            required
                        />
                    }
                    <input
                        type="email"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        placeholder="Your email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        placeholder="Your password"
                        required
                    />
                </div>
                {currentState === "Sign Up" ? <GoogleSignup/> : <div></div>}
                
                <button type="submit">
                    {currentState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, you agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Sign Up" ? (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                ) : (
                    <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                )}
            </form>
            
        </div>
    );
};

export default LoginPopup;
