// src/components/SpotShow/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import './SpotShow.css';

const SpotShow = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots.allSpots));

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <div className="all-spots">
            {spots.map((spot) => <SpotCard spot={spot} />)}
        </div>
    );

};

export default SpotShow;
