import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createOneReview } from "../../store/reviews";
import StarsRatingInput from "./StarsRatingInput";

export default function ReviewFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    console.log("user output:", user);
    const id = Number(user.id);
    console.log("id output", id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rev = {
            spotId,
            userId: user.id,
            review,
            stars
        };

        const newRev =  dispatch(createOneReview(rev, spotId))
            .then(closeModal)
            .then(history.push(`/spots/${spotId}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (newRev) history.push(`/spots/${spotId}`);
    };

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
