// frontend/src/store/spots.js
import { arrayToObj } from "../utilities/arrToObj";
import { csrfFetch } from "./csrf";

const ALL_SPOTS = "api/spots";
const ONE_SPOT = "api/spots/oneSpot"
const CREATE_SPOT = "api/spots/newSpot"

const loadAllSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots,
    };
};

const loadOneSpot = (spot) => {
    return {
        type: ONE_SPOT,
        spot
    };
};

const createNewSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        const spotsObj = arrayToObj(spots.Spots);
        dispatch(loadAllSpots(spotsObj));
        return response;
    }
};

export const getOneSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`)

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadOneSpot(spot));
        return response;
    };
};

export const createOneSpot = (spot, spotImages) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const spot = await response.json();
        spot.SpotImages = [];

        spotImages.forEach(async (image) => {
            const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(image)
            });
            const spotImage = await imageResponse.json();
            spot.SpotImages.push(spotImage);
        });

        dispatch(createNewSpot(spot));
        return spot;
    };
};


const initialState = {
    allSpots: {},
    oneSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SPOTS: {
            const newState = { ...state };
            newState.allSpots = action.spots;
            return newState;
        }
        case ONE_SPOT: {
            const newState = { ...state };
            newState.oneSpot = action.spot;
            return newState;
        }
        case CREATE_SPOT: {
            const newState = { ...state };
            newState.allSpots = { ...state.allSpots, ...action.spot };
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
