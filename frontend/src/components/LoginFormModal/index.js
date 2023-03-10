// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
            <button className="login-submit" type="submit">Log In</button>
        </form>
    );
}

export default LoginFormModal;
