// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded, setQuery }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className="nav-bar">
            <div className="return-home">
                {isLoaded && (
                    <div className="nav-right">
                        <div id="fave-icon">
                            <img src='https://res.cloudinary.com/dxcayvj3l/image/upload/v1678876686/ff7_comet_ojhedw.jpg' alt='comet' />
                        </div>
                        <div id="home-link">
                            <NavLink onClick={() => setQuery("")} to="/">FantasyBnB</NavLink>
                        </div>
                    </div>
                )}
            </div>
            <div className="profile-nav">
                {isLoaded && sessionUser && (
                    <div className="create-spot-link">
                        <NavLink to="/spots/new">Add your home</NavLink>
                    </div>
                )}
                {isLoaded && (
                    <ProfileButton user={sessionUser} setQuery={setQuery} />
                )}
            </div>
        </ul>
    );
};

export default Navigation;
