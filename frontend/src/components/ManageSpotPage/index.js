import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import SpotCard from "../SpotCard";
import "./ManageSpotPage.css";
import UpdateFormModal from "../UpdateFormModal";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";
import { NavLink } from "react-router-dom";

const ManageSpotPage = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const spots = useSelector((state) => state.spots.allSpots);
    const user = useSelector((state) => state.session.user);
    const allSpots = Object.values(spots);

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    return (
        <div className="all-user-spots">
            <div className="manage-spots">
                <h1>Manage Your Spots</h1>
                <div className="create-spot-button">
                        <NavLink to="/spots/new">Create a New Spot</NavLink>
                </div>
                <div className="manage-spot-cards">
                    {allSpots.length > 0 && allSpots.map((spot) =>
                        <div className="spot-card">
                            <div className="details-card">
                                <SpotCard key={spot.id} spot={spot} user={user} />
                            </div>
                            <div className="update-delete">
                                <OpenModalButton
                                    buttonText="Update"
                                    modalComponent={<UpdateFormModal spot={spot} />}
                                />
                                {/* <button>
                                    Update
                                </button> */}
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteSpotModal spot={spot} />}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default ManageSpotPage;
