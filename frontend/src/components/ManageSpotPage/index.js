import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SpotCard from "../SpotCard";
import UpdateFormModal from "../UpdateFormModal";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";
import "./ManageSpotPage.css";

const ManageSpotPage = ({ query }) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const spots = useSelector((state) => state.spots.allSpots);
    const user = useSelector((state) => state.session.user);
    const allSpots = Object.values(spots);
    const searchedUserSpots = allSpots.filter((spot) => spot.city.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch, user])

    return (
        <div className="all-user-spots">
            <div className="manage-spots">
                <h1>Manage Your Spots</h1>
                <div className="create-spot-button-container">
                    <NavLink to="/spots/new">
                        <div className="create-spot-button">
                            Create a New Spot
                        </div>
                    </NavLink>
                </div>
                <div className="manage-spot-cards">
                    {searchedUserSpots.length > 0 && searchedUserSpots.map((spot) =>
                        <div className="spot-card">
                            <div className="details-card">
                                <SpotCard key={spot.id} spot={spot} user={user} />
                            </div>
                            <div className="update-delete-button-container">
                                <div className="update-spot-button">
                                    <OpenModalButton
                                        buttonText="Update"
                                        modalComponent={<UpdateFormModal spot={spot} />}
                                    />
                                </div>
                                <div className="delete-spot-button">
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteSpotModal spot={spot} />}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default ManageSpotPage;
