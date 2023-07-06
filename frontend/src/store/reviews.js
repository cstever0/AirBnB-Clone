// frontend/src/store/reviews.js
import normalizer from "../utilities/normalizer";
import { arrayToObj } from "../utilities/arrToObj";
import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = "api/spots/reviews";
const CREATE_REVIEW = "api/reviews/new";
const EDIT_REVIEW = "api/reviews/edit";
const DELETE_REVIEW = "api/reviews/delete";

const loadSpotReviews = (reviews) => {
    return {
        type: SPOT_REVIEWS,
        reviews
    };
};

const createSpotReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    };
};

const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    };
};

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    };
};

export const getSpotReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const { Reviews } = await response.json();
        dispatch(loadSpotReviews(Reviews));
        return Reviews;
    }

    const errors = await response.json();
    return errors;
};

export const createOneReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createSpotReview(review));
        return review;
    };

    const errors = await response.json();
    return errors;
};

export const editOneReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(editReview(review));
        return review;
    };

    const errors = await response.json();
    return errors;
};

export const deleteOneReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        return dispatch(deleteReview(id));
    };

    const errors = await response.json();
    return errors;
};


const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPOT_REVIEWS: {
            const newState = normalizer(state);
            newState.spot = normalizer(action.reviews);
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = normalizer(state);
            newState.spot[action.review.id] = normalizer(action.review);
            newState.user[action.review.id] = normalizer(action.review);
            return newState;
        }
        case EDIT_REVIEW: {
            const newState = normalizer(state);
            newState.spot[action.review.id] = normalizer(action.review);
            newState.user[action.review.id] = normalizer(action.review);
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = normalizer(state);
            delete newState.spot[action.id];
            delete newState.user[action.id];
            return newState;
        }
        default:
            return state;
    };
};

export default reviewsReducer;
