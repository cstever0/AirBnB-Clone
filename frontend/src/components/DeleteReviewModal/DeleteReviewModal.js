import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteOneReview } from "../../store/reviews";
import "./DeleteReviewModal.css";

export default function DeleteReviewModal({ review }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteClick = (e) => {
        // e.preventDefault();
        closeModal();
        dispatch(deleteOneReview(review.id));
    };

    const keepClick = () => {
        // e.preventDefault();
        closeModal();
    };


    return (
        <div className="delete-review-wrapper">
            <div className="confirm-delete-review">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to delete this review?
                </p>
            </div>
            <div className="delete-review-buttons">
                <button onClick={deleteClick}>
                    Yes (Delete Review)
                </button>
                <button onClick={keepClick}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    );
};
