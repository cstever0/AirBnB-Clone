import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneBooking, editOneBooking, getSpotBookings } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import "./CreateBookingModal.css";


export default function CreateBookingModal({ spot, user, booking }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const bookings = useSelector((state) => state.bookings.spot);
    const allBookings = Object.values(bookings);
    const existingBookings = allBookings?.filter((booking) => new Date(booking.endDate) >= new Date()).sort((a, b) => new Date(a.startDate) - new Date(b.endDate));
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (booking) {
            setStartDate(booking.startDate);
            setEndDate(booking.endDate);
        }
    }, [dispatch, booking]);

    useEffect(() => {
        dispatch(getSpotBookings(spot.id));
    }, [dispatch, spot.id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newBooking = () => {
            if (booking) {
                return {
                    ...booking,
                    startDate,
                    endDate
                };
            } else {
                return {
                    startDate,
                    endDate
                };
            };
        };

        try {
            if (booking) await dispatch(editOneBooking(newBooking()));
            else await dispatch(createOneBooking(spot.id, newBooking()));
            // history.push("/bookings/current")
            closeModal();
        } catch (e) {
            const errors = await e.json();
            return setErrors(errors.errors);
        };

        closeModal();
    };

    return (
        <div className="create-booking-modal-container">
            <div className="create-booking-modal-title">
                {booking ? <h1>Update Booking</h1> : <h1>{spot.name} Booking</h1>}
            </div>
            <div className="existing-bookings-list">
                <p className="existing-bookings-title">Unavailable Dates</p>
                {existingBookings?.length > 0 ? (
                    existingBookings.map((booking) => (
                        <p key={booking.id} className="existing-booking-details">{booking.startDate} - {booking.endDate}</p>
                    )))
                    :
                    (
                        <p>Currently no bookings!</p>
                    )
                }
            </div>
            <div className="create-booking-errors-container">
                {errors &&
                    Object.values(errors).map((error) => (
                        <p className="errors" key={error}>
                            {error}
                        </p>
                    ))
                }
            </div>
            <div className="create-booking-modal-form-container">
                <form
                    className="create-booking-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Start Date
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        End Date
                        <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                    <div className="create-booking-modal-submission-container">
                        <div className="create-booking-modal-cancel-button">
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                        <div className="create-booking-modal-submit-button">
                            <button type="submit">
                                {booking ? "Save" : "Reserve"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};
