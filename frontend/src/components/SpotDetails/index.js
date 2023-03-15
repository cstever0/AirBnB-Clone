// src/components/SpotDisplay/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import ReviewDetails from "../ReviewsDetails";
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.oneSpot);

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId]);

    if (!Object.values(spot).length) return null;
    const spotImages = spot.SpotImages;
    const previewImage = spot.SpotImages[0];
    const spotOwner = spot.Owner;

    return (
        <>
            <div className="spot-container">
                <div className="spot-location">
                    <h1>{spot.name}</h1>
                    <h2>{spot.city}, {spot.state}, {spot.country}</h2>
                </div>
                <div className="all-images">
                    <div id="preview-image">
                        <img src={`${previewImage.url}`} alt="" />
                    </div>
                    <div className="spot-images">
                        {spotImages.map((image) =>
                            <img src={`${image.url}`} alt="" />
                        )}
                    </div>
                </div>
                <div className="spot-details">
                    <h1>Hosted by {spotOwner.firstName}, {spotOwner.lastName}</h1>
                    <p>{spot.description}</p>
                </div>
                <div className="reservation-details">
                    <h2>{spot.price} night</h2>
                    <div className="spot-rating">
                        {spot.avgStarRating !== 'No reviews yet' ? <i className="fa fa-star">{spot.avgStarRating}</i> : 'No reviews yet'}
                    </div>
                    <div className="num-reviews">
                        {spot.numReviews} reviews
                    </div>
                </div>
                <div className="reservation-button">
                    <button onClick={() => window.alert("Feature Coming Soon...")}>Reserve</button>
                </div>
            </div>
            <div>
                <div className="review-rating">
                    {spot.avgStarRating !== 'No reviews yet' ? <i className="fa fa-star">{spot.avgStarRating}</i> : 'No reviews yet'}
                    <div className="reviews-num-reviews">
                        {spot.numReviews} reviews
                    </div>
                </div>
                <ReviewDetails />
            </div>
        </>
    );
}

export default SpotDetails;
