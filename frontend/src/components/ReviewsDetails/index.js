// src/components/ReviewsDisplay/index.js
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";

const ReviewDetails = ({ review, user }) => {
    return (
        <div className="review-list">
            <div className="review-details">
                <h2>{review.User.firstName}</h2>
                <h3>{review.updatedAt}</h3>
                <p>{review.review}</p>
            </div>
            <div className="delete-review-button">
                { user !== null && review.User.id === user.id  && (
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
