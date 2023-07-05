import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteOneBooking } from "../../store/bookings";
import "./DeleteReviewModal.css";

export default function DeleteBookingModal({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteClick = (e) => {
        // e.preventDefault();
        dispatch(deleteOneBooking(id));
        closeModal();
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
                    Are you sure you want to delete this booking?
                </p>
            </div>
            <div className="delete-review-buttons">
                <button onClick={deleteClick}>
                    Yes (Delete Booking)
                </button>
                <button onClick={keepClick}>
                    No (Keep Booking)
                </button>
            </div>
        </div>
    );
};
