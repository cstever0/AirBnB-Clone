import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserSpots } from "../../store/spots";
import DeleteFormModal from "./DeleteFormModal";
import UpdateFormModal from "./UpdateFormModal";
import OpenModalButton from "../OpenModalButton";
import SpotCard from "../SpotCard";
import "./ManageSpotPage.css";

const ManageSpotPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const spots = useSelector((state) => state.spots.allSpots);
    const user = useSelector((state) => state.session.user);
    const allSpots = Object.values(spots);

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    return (
        <div className="all-user-spots">
            {allSpots.map((spot) =>
                <div className="spot-card">
                    <div className="details-card">
                        <SpotCard key={spot.id} spot={spot} user={user} />
                    </div>
                    <div className="update-delete">
                        <OpenModalButton
                            buttonText="Update"
                            modalComponent={<UpdateFormModal spot={spot} />}
                            />
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteFormModal spot={spot} />}
                        />
                    </div>
                </div>
            )}
        </div>
    );

};

export default ManageSpotPage;
