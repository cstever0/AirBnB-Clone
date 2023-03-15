import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createOneReview } from "../../store/reviews";
import StarsRatingInput from "./StarsRatingInput";

export default function ReviewFormModal({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    console.log("spot.id output:", spot.id);
    console.log("user selector output:", user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rev = {
            review,
            stars
        };

        console.log("rev output:", rev);
        const newReview = await dispatch(createOneReview(rev, spot.id, user))
            .then(closeModal)
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });

        if (newReview) history.push(`/spots/${spot.id}`);
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
                <input
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    max={5}
                    min={1}
                />
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
