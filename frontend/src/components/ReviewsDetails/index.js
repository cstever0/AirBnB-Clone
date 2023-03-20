// src/components/ReviewsDisplay/index.js
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";

const ReviewDetails = ({ review, user }) => {
    let date = new Date(review.createdAt);
    let monthNames = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let monthIdx = date.getMonth();
    let month = monthNames[monthIdx];
    let year = date.getFullYear();

    return (
        <div className="review-list">
            <div className="review-details">
                <h2>{review.User.firstName}</h2>
                <h3>{month}, {year}</h3>
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
