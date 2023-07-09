import normalizer from "../utilities/normalizer";
import { arrayToObj } from "../utilities/arrToObj";
import { csrfFetch } from "./csrf";

const USER_BOOKINGS = "api/user/bookings";
const SPOT_BOOKINGS = "api/spot/bookings";
const CREATE_BOOKING = "api/bookings/new";
const EDIT_BOOKING = "api/bookings/edit";
const DELETE_BOOKING = "api/bookings/delete";

const loadUserBookings = (bookings) => {
    return {
        type: USER_BOOKINGS,
        bookings
    };
};

const loadSpotBookings = (bookings) => {
    return {
        type: SPOT_BOOKINGS,
        bookings
    };
};

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    };
};

const editBooking = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
    };
};

const deleteBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    };
};


export const getUserBookings = () => async (dispatch) => {
    const response = await csrfFetch("/api/bookings/current");

    if (response.ok) {
        const { Bookings } = await response.json();
        dispatch(loadUserBookings(Bookings));
        return Bookings;
    };

    const errors = await response.json();
    return errors;
};

export const getSpotBookings = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`);

    if (response.ok) {
        const { Bookings } = await response.json();
        dispatch(loadSpotBookings(Bookings));
        return Bookings;
    };

    const errors = await response.json();
    return errors;
};

export const createOneBooking = (id, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const booking = await response.json();
        dispatch(createBooking(booking));
        return booking;
    };

    const errors = await response.json();
    return errors;
};

export const editOneBooking = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const booking = await response.json();
        dispatch(editBooking(booking));
        return booking;
    };

    const errors = await response.json();
    return errors;
};

export const deleteOneBooking = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const { message } = await response.json();
        dispatch(deleteBooking(id));
        return message;
    };

    const errors = await response.json();
    return errors;
};


const initialState = {
    user: {},
    spot: {}
};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_BOOKINGS: {
            const newState = normalizer(state);
            newState.user = normalizer(action.bookings);
            return newState;
        }
        case SPOT_BOOKINGS: {
            const newState = normalizer(state);
            newState.spot = normalizer(action.bookings);
            return newState;
        }
        case CREATE_BOOKING: {
            const newState = normalizer(state);
            newState.user[action.booking.id] = normalizer(action.booking);
            newState.spot[action.booking.id] = normalizer(action.booking);
            return newState;
        }
        case EDIT_BOOKING: {
            const newState = normalizer(state);
            newState.user[action.booking.id] = normalizer(action.booking);
            newState.spot[action.booking.id] = normalizer(action.booking);
            return newState;
        }
        case DELETE_BOOKING: {
            const newState = normalizer(state);
            delete newState.user[action.id];
            delete newState.spot[action.id];
            return newState;
        }
        default: {
            return state;
        }
    };
};

export default bookingsReducer;
