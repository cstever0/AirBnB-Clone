import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { deleteOneReview } from "../../store/reviews";

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
        <>
            <h1>Confirm Delete</h1>
            <p>
                Are you sure you want to delete this review?
            </p>
            <button onClick={deleteClick}>
                Yes (Delete Review)
            </button>
            <button onClick={keepClick}>
                No (Keep Review)
            </button>
        </>
    );
};
