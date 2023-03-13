// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className="nav-bar">
            <div>
                <NavLink exact to="/">FantasyBnB</NavLink>
            </div>
            <div className="profile-nav">
                {isLoaded && sessionUser && (
                    <div className="create-spot-link">
                        <NavLink to="/">Create a New Spot</NavLink>
                    </div>
                )}
                {isLoaded && (
                    <ProfileButton user={sessionUser} />
                )}
            </div>
        </ul>
    );
};

export default Navigation;
