import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createOneReview } from "../../store/reviews";
import StarsRatingInput from "./StarsRatingInput";

export default function ReviewFormModal() {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                <input
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Leave your review here..."
                />
                <StarsRatingInput
                    stars={stars}
                    onChange={setStars}
                />
                <button onClick={closeModal}>Submit Your Review</button>
            </form>
        </div>
    )
}
