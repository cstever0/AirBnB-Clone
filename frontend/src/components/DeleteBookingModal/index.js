import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { deleteOneBooking } from "../../store/bookings";

export default function DeleteBookingModal({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});

    const deleteClick = async (e) => {
        setErrors({})
        try {
            await dispatch(deleteOneBooking(id));
            closeModal();
        } catch (e) {
            const error = await e.json();
            return setErrors(error)
        }
    };

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-header">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to delete this booking?
                </p>
            </div>
            <div className="delete-modal-buttons-container">
                <div className="cancel-delete-button">
                    <button onClick={() => closeModal()}>
                        No (Keep Booking)
                    </button>
                </div>
                <div className="confirm-delete-button">
                    <button onClick={deleteClick}>
                        Yes (Delete Booking)
                    </button>
                </div>
            </div>
        </div>
    );
};
