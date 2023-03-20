// src/components/ReviewsDisplay/index.js
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";

const ReviewDetails = ({ review, user }) => {
    const date = new Date(review.createdAt);
    const monthNames = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"
    ];
    const monthIdx = date.getMonth();
    const month = monthNames[monthIdx];
    const year = date.getFullYear();

    return (
        <div className="review-list">
            <div className="review-details">
                <h2>{review.User.firstName}</h2>
                <h3>{month}, {year}</h3>
                <p>{review.review}</p>
            </div>
            <div className="delete-review-button">
                {user !== null && review.User.id === user.id && (
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteReviewModal review={review} />}
                    />
                )}
            </div>
        </div>
    )

};

export default ReviewDetails;
