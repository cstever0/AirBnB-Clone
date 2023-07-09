// src/components/ReviewsDisplay/index.js
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import ReviewFormModal from "../ReviewFormModal";
import "./ReviewDetails.css";

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

    // if (!review.User) return null;

    return (
        <div className="review-list-container">
            <div className="review-details">
                <h2>{review.User.firstName}</h2>
                <h3>{month}, {year}</h3>
                <p>{review.review}</p>
            </div>
            <div className="review-button-container">
                {user !== null && review.userId === user.id && (
                    <>
                        <div className="edit-review-button">
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={<ReviewFormModal oldReview={review} user={user} />}
                            />
                        </div>
                        <div className="delete-review-button">
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal review={review} />}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )

};

export default ReviewDetails;
