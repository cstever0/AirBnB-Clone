import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createOneReview, editOneReview } from "../../store/reviews";
import StarsRatingInput from "./StarsRatingInput";

export default function ReviewFormModal({ spot, oldReview }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (oldReview) {
            setReview(oldReview.review);
            setStars(oldReview.stars);
        };
    }, [dispatch, oldReview]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const rev = () => {
            if (oldReview) {
                return {
                    ...oldReview,
                    review,
                    stars
                };
            } else {
                return {
                    review,
                    stars
                };
            };
        };

        try {
            if (oldReview) await dispatch(editOneReview(rev()))
            else await dispatch(createOneReview(spot.id, user, rev()))
            // history.push(`/spots/${spot.id}`);
            closeModal();
        } catch (e) {
            const errors = await e.json();
            return setErrors(errors.errors);
        };

        closeModal();
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
                {/* <input
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    max={5}
                    min={1}
                /> */}
                <StarsRatingInput
                    stars={stars}
                    value={stars}
                    onChange={setStars}
                />
                <button
                    className="review-submit"
                    type="submit"
                    disabled={stars < 1 || review.length < 10 ? true : false}
                >
                    Submit Your Review
                </button>
            </form>
        </div>
    )
}
