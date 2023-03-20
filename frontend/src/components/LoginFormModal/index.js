// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push("/"))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const loginDemo = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: 'DemoUser1', password: 'password1' }))
            .then(closeModal)
            .then(history.push("/"))
    };

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <ul>
                {Object.values(errors).map((error, idx) => <li className="errors" key={idx}>{error}</li>)}
            </ul>
            <label className="login-label">
                Username or Email
                <input
                    className="login-input"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label className="login-label">
                Password
                <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button
                className="login-submit"
                type="submit"
                disabled={credential < 4 || password < 6 ? true : false}
            >
                Log In
            </button>
            <Link onClick={loginDemo} className="demo-login">Demo User</Link>
        </form>
    );
}

export default LoginFormModal;
