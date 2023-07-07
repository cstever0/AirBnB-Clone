// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded, query, setQuery }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className="nav-bar">
            <div id="return-home">
                {isLoaded && (
                    <div className="nav-right">
                        <div id="fave-icon">
                            <img src='https://res.cloudinary.com/dxcayvj3l/image/upload/v1678876686/ff7_comet_ojhedw.jpg' alt='comet' />
                            <NavLink to="/">FantasyBnB</NavLink>
                        </div>
                        <div className="search-bar-container">
                            <div className="search-input">
                                <input
                                    type="search"
                                    value={query}
                                    placeholder="Search by city..."
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            {/* <div className="search-icon">
                            <button onClick={handleClick}><i className="fa-solid fa-x"></i></button>
                        </div> */}
                        </div>
                    </div>
                )}
            </div>
            <div className="profile-nav">
                {isLoaded && sessionUser && (
                    <div className="create-spot-link">
                        <NavLink to="/spots/new">Create a New Spot</NavLink>
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
