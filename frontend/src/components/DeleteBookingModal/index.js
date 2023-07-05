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
            <div className="errors">
                {errors.message &&
                    <p>{errors.message}</p>
                }
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
