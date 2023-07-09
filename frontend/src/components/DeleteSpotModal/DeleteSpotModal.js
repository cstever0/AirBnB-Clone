import { useDispatch } from "react-redux";
import { deleteOneSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";

export default function DeleteSpotModal({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteClick = (e) => {
        // e.preventDefault();
        dispatch(deleteOneSpot(spot.id));
        closeModal();
    };

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-header">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to remove this spot
                    from the listings?
                </p>
            </div>
            <div className="delete-modal-buttons-container">
                <div className="cancel-delete-button">
                    <button onClick={() => closeModal()}>
                        No (Keep Spot)
                    </button>
                </div>
                <div className="confirm-delete-button">
                    <button onClick={deleteClick}>
                        Yes (Delete Spot)
                    </button>
                </div>
            </div>
        </div>
    );
};
