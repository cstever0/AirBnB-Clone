import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "./SpotCard.css";

export default function SpotCard({ spot}) {

    return (
        <div className="each-spot">
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                <div className="all-spot-image">
                    <img src={spot.previewImage} alt="spotImage"
                        data-tooltip-id="spot-name"
                        data-tooltip-content={spot.name}
                    />
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
            <Tooltip id="spot-name" />
        </div >
    )
}
