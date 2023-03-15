import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import CreateSpotForm from "../CreateSpotForm";

export default function UpdateFormModal({ spot }) {
    // const dispatch = useDispatch();
    // const { closeModal } = useModal();


    return (
        <>
            <CreateSpotForm spot={spot} />
        </>
    );
};
