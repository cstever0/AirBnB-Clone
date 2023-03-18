// frontend/src/store/spots.js
import { arrayToObj } from "../utilities/arrToObj";
import { csrfFetch } from "./csrf";

const ALL_SPOTS = "api/spots";
const USER_SPOTS = "api/spots/user"
const ONE_SPOT = "api/spots/oneSpot";
const CREATE_SPOT = "api/spots/newSpot";
const UPDATE_SPOT = "/api/spots/update";
const DELETE_SPOT = "api/spots/delete";


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
    };
};

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const loadUserSpots = (spots) => {
    return {
        type: USER_SPOTS,
        spots
    };
};

const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    };
};

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        const spotsObj = arrayToObj(spots.Spots);
        dispatch(loadAllSpots(spotsObj));
        return response;
    };
};

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`)

    if (response.ok) {
        const spots = await response.json();
        const spotsObj = arrayToObj(spots.Spots);
        dispatch(loadUserSpots(spotsObj));
        return spots;
    }
}

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

        for (let image of spotImages) {
            const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(image)
            });
            const spotImage = await imageResponse.json();
            spot.SpotImages.push(spotImage);
        };

        dispatch(createNewSpot(spot));
        return spot;
    };
};

export const updateOneSpot = (spot, spotImages) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const spot = await response.json();
        spot.SpotImages = [];

        for (let image of spotImages) {
            const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(image)
            });
            const spotImage = await imageResponse.json();
            spot.SpotImages.push(spotImage);
        };

        dispatch(updateSpot(spot));
        return spot;
    };
};

export const deleteOneSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        return dispatch(deleteSpot(id))
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
            const newState = { ...state, allSpots: { ...state.allSpots } };
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots } };
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        }
        case USER_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots } };
            newState.allSpots = { ...action.spots }
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots } }
            delete newState.allSpots[action.id]
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
