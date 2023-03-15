// src/components/SpotShow/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import './SpotShow.css';

const SpotShow = () => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.allSpots);
    const allSpots = Object.values(spot);
    console.log("allSpot output: ", allSpots)

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    if (!allSpots.length) return null;

    return (
        <div className="all-spots">
            {allSpots.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
        </div>
    );

};

export default SpotShow;
