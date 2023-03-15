import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createOneReview } from "../../store/reviews";
import StarsRatingInput from "./StarsRatingInput";

export default function ReviewFormModal() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    console.log("user output:", user);
    const id = Number(user.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            userId: 1,
            review,
            stars
        };

        return dispatch(createOneReview(newReview, spotId))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Leave your review here..."
                    cols="30"
                    rows="10"
                >
                </textarea>
                <StarsRatingInput
                    stars={stars}
                    onChange={setStars}
                    value={stars}
                />
                <button className="review-submit" type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}
