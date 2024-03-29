// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user, setQuery }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
            .then(history.push("/"))
            .then(closeMenu());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div id="profile-button">
                <button onClick={openMenu}>
                    {/* <i className="fas fa-bars" /> */}
                    <i className="fas fa-user-circle" />
                </button>
            </div>
            <div className="dropdown-div">
                <div className={ulClassName} ref={ulRef}>
                    {user ? (
                        <div className="user-info">
                            <div id="hello-user">
                                Hello, {user.firstName}
                            </div>
                            <div id="user-email">
                                {user.email}
                            </div>
                            <div id="manage-spots-link">
                                <NavLink onClick={() => {
                                    setQuery("")
                                    closeMenu()
                                }} to="/spots/manage">Manage Spots</NavLink>
                            </div>
                            <div id="manage-bookings-link">
                                <NavLink onClick={closeMenu} to="/bookings/manage">Manage Bookings</NavLink>
                            </div>
                            <div id="logout-button-container">
                                <div id="logout-button">
                                    <button onClick={logout}>Log Out</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="login-sign-up-menu">
                            <div className="login-button">
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                            </div>
                            <div className="sign-up-button">
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfileButton;
