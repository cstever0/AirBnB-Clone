// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
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
                    <i className="fas fa-bars" />
                    <i className="fas fa-user-circle" />
                </button>
            </div>
            <div className="dropdown-div">
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <>
                            <li>Hello, {user.firstName}</li>
                            <li>{user.email}</li>
                            <NavLink to="/spots/manage">Manage Spots</NavLink>
                            <button onClick={logout}>Log Out</button>

                        </>
                    ) : (
                        <div className="modal-menu">
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default ProfileButton;
