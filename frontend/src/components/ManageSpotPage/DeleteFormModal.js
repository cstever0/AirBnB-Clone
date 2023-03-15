import { useDispatch } from "react-redux";
import { deleteOneSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";

export default function DeleteFormModal({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteClick = (e) => {
        // e.preventDefault();
        closeModal();
        dispatch(deleteOneSpot(spot.id));
    };

    const keepClick = () => {
        // e.preventDefault();
        closeModal();
    };


    return (
        <>
            <h1>Confirm Delete</h1>
            <p>
                Are you sure you want to remove this spot
                from the listings?
            </p>
            <button onClick={deleteClick}>
                Yes (Delete Spot)
            </button>
            <button onClick={keepClick}>
                No (Keep Spot)
            </button>
        </>
    );
};
