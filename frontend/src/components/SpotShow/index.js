// src/components/SpotShow/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import './SpotShow.css';

const SpotShow = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots.allSpots));

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <div className="all-spots">
            {spots.map((spot) =>
                <div className="each-spot">
                    <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                        <div className="all-spot-image">
                            <img src={spot.previewImage} alt="spotImage" />
                        </div>
                        <div className="all-spot-details">
                            <div className="all-city-state">
                                {spot.city}, {spot.state}
                            </div>
                            <div className="all-spot-rating">
                                {spot.avgRating !== 'No reviews yet' ? <i className="fa fa-star">{spot.avgRating}</i> : 'No reviews yet'}
                            </div>
                        </div>
                        <div className="all-spot-price">${spot.price} Night</div>
                    </NavLink>
                </div>)}
        </div>
    );

};

export default SpotShow;
