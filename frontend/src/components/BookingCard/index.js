import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateBookingModal from "../CreateBookingModal";
import DeleteBookingModal from "../DeleteBookingModal";
import "./BookingCard.css";

export default function BookingCard({ spot, user, booking }) {

    return (
        <div className="booking-card-container">
            <NavLink to={`/spots/${spot.id}`}>
                <div className="booking-card-title">
                    <h1>Reservation at {spot.name}</h1>
                </div>
                <div className="booking-card-image">
                    <img src={spot.previewImage} alt="nice-image" />
                </div>
                <div className="booking-card-details">
                    <p>Arrive: {booking.startDate}</p>
                    <p>Depart: {booking.endDate}</p>
                </div>
            </NavLink>
            <div className="booking-card-buttons-container">
                <div className="booking-card-edit-button">
                    <OpenModalButton
                        buttonText="Edit booking"
                        modalComponent={<CreateBookingModal spot={spot} user={user} booking={booking}/>}
                    />
                </div>
                <div className="booking-card-delete-button">
                    <OpenModalButton
                        buttonText="Delete booking"
                        modalComponent={<DeleteBookingModal id={booking.id} />}
                    />
                </div>
            </div>
        </div>
    );
};
