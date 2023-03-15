// frontend/src/store/reviews.js
import { arrayToObj } from "../utilities/arrToObj";
import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = "api/spots/reviews";
const CREATE_REVIEW = "api/reviews/new";

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
    }
}

export const getSpotReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        const reviewsObj = arrayToObj(reviews.Reviews);
        dispatch(loadSpotReviews(reviewsObj));
        return response;
    }
};

export const createOneReview = (review, spotId, user) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const review = await response.json();
        review.User = user;
        console.log("review json output:", review);
        dispatch(createSpotReview(review));
        return review;
    }
}

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SPOT_REVIEWS: {
            const newState = { ...state };
            newState.spot = { ...action.reviews };
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = { ...state, spot: {...state.spot} };
            newState.spot[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    };
};

export default reviewsReducer;
