// frontend/src/store/reviews.js
import { arrayToObj } from "../utilities/arrToObj";

const SPOT_REVIEWS = "api/spots/reviews";

const loadSpotReviews = (reviews) => {
    return {
        type: SPOT_REVIEWS,
        reviews
    };
};

export const getSpotReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        const reviewsObj = arrayToObj(reviews.Reviews);
        dispatch(loadSpotReviews(reviewsObj));
        return response;
    }
};

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SPOT_REVIEWS: {
            const newState = { ...state.spot };
            newState.spot = { ...action.reviews };
            return newState;
        }
        default:
            return state;
    };
};

export default reviewsReducer;
