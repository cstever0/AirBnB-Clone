import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteOneReview } from "../../store/reviews";
import "./DeleteReviewModal.css";
import { getOneSpot } from "../../store/spots";

export default function DeleteReviewModal({ review }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteClick = async (e) => {
        // e.preventDefault();
        dispatch(deleteOneReview(review.id));
        closeModal();
    };

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-header">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to delete this review?
                </p>
            </div>
            <div className="delete-modal-buttons-container">
                <div className="cancel-delete-button">
                    <button onClick={() => closeModal()}>
                        No (Keep Review)
                    </button>
                </div>
                <div className="confirm-delete-button">
                    <button onClick={deleteClick}>
                        Yes (Delete Review)
                    </button>
                </div>
            </div>
        </div>
    );
};
