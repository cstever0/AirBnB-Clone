// src/components/SpotDisplay/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import ReviewDetails from "../ReviewDetails";
import ReviewFormModal from "../ReviewFormModal";
import CreateBookingModal from "../CreateBookingModal";
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.oneSpot);
    const user = useSelector((state) => state.session.user);
    const spotReviews = useSelector((state) => state.reviews.spot);
    const reviews = Object.values(spotReviews).sort((a, b) => b.id - a.id);
    console.log(spotReviews);

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId, spotReviews]);

    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch, spotId]);

    if (!Object.values(spot).length) return null;
    if (!reviews) return null;
    const spotImages = spot.SpotImages;
    const previewImage = spot.SpotImages[0];
    const spotOwner = spot.Owner;


    return (
        <div className="entire-spot-container">
            <div className="spot-container">
                <div className="spot-location">
                    <h1>{spot.name}</h1>
                    <h2>{spot.city}, {spot.state}, {spot.country}</h2>
                </div>
                <div className="all-images">
                    <div className="preview-image">
                        <img src={`${previewImage.url}`} alt="" />
                    </div>
                    <div className="spot-images">
                        {spotImages.slice(1).map((image) =>
                            <img src={`${image.url}`} alt="" />
                        )}
                    </div>
                </div>
                <div className="spot-reservation">
                    <div className="spot-details">
                        <h1>Hosted by {spotOwner.firstName}, {spotOwner.lastName}</h1>
                        <p>{spot.description}</p>
                    </div>
                    <div className="reservation-section">
                        <div className="reservation-details">
                            <h2>${spot.price}/night</h2>
                            <div className="spot-rating">
                                {spot.avgStarRating !== 'No Reviews Yet' ? <><i className="fa fa-star"></i><span>{spot.avgStarRating.toFixed(1)}</span></> : <><i className="fa fa-star"></i><span>New</span></>}
                                <div className="spot-num-reviews">
                                    {spot.numReviews !== "No Reviews Yet" &&
                                        (spot.numReviews === 1 ?
                                            (
                                                <span>• {spot.numReviews} review</span>
                                            )
                                            :
                                            (
                                                <span>• {spot.numReviews} reviews</span>
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className="reservation-button">
                            {user.id !== spot.ownerId &&
                                <OpenModalButton
                                    buttonText="Reserve"
                                    modalComponent={<CreateBookingModal spot={spot} user={user} />}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="review-details">
                <div className="review-rating">
                    <div className="star-dot-reviews-list">
                        {spot.avgStarRating !== 'No Reviews Yet' ? <><i className="fa fa-star"></i><span>{spot.avgStarRating.toFixed(1)}</span></> : <><i className="fa fa-star"></i><span>New</span></>}
                        <div className="reviews-num-reviews">
                            {spot.numReviews !== "No Reviews Yet" &&
                                (spot.numReviews === 1 ?
                                    (
                                        <span>• {spot.numReviews} review</span>
                                    )
                                    :
                                    (
                                        <span>• {spot.numReviews} reviews</span>
                                    )
                                )}
                        </div>
                    </div>
                </div>
                <div id="post-review-button">
                    {user !== null && user.id !== spot.ownerId && !reviews.find((r) => r.userId === user.id) && (
                        <OpenModalButton
                            buttonText="Post Your Review"
                            modalComponent={<ReviewFormModal spot={spot} />}
                        />
                    )}
                </div>
                <div className="all-spot-reviews">
                    {reviews.length < 1 && user !== null && user.id !== spot.ownerId && <p>Be the first to post a review!</p>}
                    {reviews.length > 0 && reviews.map((review) => <ReviewDetails key={review.id} review={review} user={user} />)}
                </div>
            </div>
        </div>
    );
}

export default SpotDetails;
