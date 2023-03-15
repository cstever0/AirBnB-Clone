// src/components/ReviewsDisplay/index.js
const ReviewDetails = ({ review }) => {
    return (
        <div className="review-list">
            <h2>{review.User.firstName}</h2>
            <h3>{review.updatedAt}</h3>
            <p>{review.review}</p>
        </div>
    )

};

export default ReviewDetails;
