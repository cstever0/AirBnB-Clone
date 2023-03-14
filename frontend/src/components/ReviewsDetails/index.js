// src/components/ReviewsDisplay/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";

const ReviewDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = Object.values(useSelector((state) => state.reviews.spot));

    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch, spotId]);

    if (!Object.values(reviews).length) return null;

    return (
        <div className="review-list">
            {reviews.map((review) =>
                <>
                    <h2>{review.User.firstName}</h2>
                    <h3>{review.updatedAt}</h3>
                    <p>{review.review}</p>
                </>
            )}
        </div>
    )

};

export default ReviewDetails;
