import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BookingCard from "../BookingCard";
import { getUserBookings } from "../../store/bookings";
import { getAllSpots } from "../../store/spots";
import "./ManageBookingsPage.css";

export default function ManageBookingsPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userBookings = useSelector((state) => state.bookings.user);
    const allBookings = Object.values(userBookings);
    const sortedBookings = allBookings?.filter((booking) => new Date(booking.endDate) >= new Date()).sort((a, b) => new Date(a.startDate) - new Date(b.endDate));
    const spots = useSelector((state) => state.spots.allSpots);
    const allSpots = Object.values(spots);

    useEffect(() => {
        dispatch(getUserBookings());
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);


    return (
        <div className="manage-bookings-page-container">
            <div className="manage-bookings-page-header">
                <div className="manage-bookings-page-title">
                    <h1>Manage Bookings</h1>
                </div>
            </div>
            <div className="manage-bookings-cards-container">
                {sortedBookings.length > 0 ? (
                    sortedBookings.map((booking) => (
                        <BookingCard key={booking.id} user={user} booking={booking} spot={allSpots.find((spot) => spot.id === booking.spotId)} />
                    )))
                    :
                    (
                        <p>Your Reservations will show up here!</p>
                    )
                }
            </div>
        </div>
    );
};
