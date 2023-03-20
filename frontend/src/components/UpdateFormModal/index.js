import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updateOneSpot } from "../../store/spots";
import "./UpdateFormModal.css";

export default function UpdateFormModal({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const [id] = useState(spot.id);
    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    // const [latitude, setLatitude] = useState(spot.latitude);
    // const [longitude, setLongitude] = useState(spot.longitude);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    // const [previewImage, setPreviewImage] = useState(spot.previewImage);
    // const [spotImage1, setSpotImage1] = useState("");
    // const [spotImage2, setSpotImage2] = useState("");
    // const [spotImage3, setSpotImage3] = useState("");
    // const [spotImage4, setSpotImage4] = useState("");
    const [errors, setErrors] = useState({});
    // const [imageErrors, setImageErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors({});
        // let customErrors = {};
        // const fileTypes = ['png', "jpg", "peg", "ebp"]

        const spot = {
            id,
            country,
            address,
            city,
            state,
            // latitude,
            // longitude,
            description,
            name,
            price,
        };

        // if (!previewImage) customErrors.previewImage = "Preview image is required"
        // if (previewImage && !fileTypes.includes(previewImage.slice(-3))) customErrors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
        // if (spotImage1 && !fileTypes.includes(spotImage1.slice(-3))) customErrors.spotImage1 = "Image URL must end in .png, .jpg, or .jpeg";
        // if (spotImage2 && !fileTypes.includes(spotImage2.slice(-3))) customErrors.spotImage2 = "Image URL must end in .png, .jpg, or .jpeg";
        // if (spotImage3 && !fileTypes.includes(spotImage3.slice(-3))) customErrors.spotImage3 = "Image URL must end in .png, .jpg, or .jpeg";
        // if (spotImage4 && !fileTypes.includes(spotImage4.slice(-3))) customErrors.spotImage4 = "Image URL must end in .png, .jpg, or .jpeg";

        // setImageErrors(customErrors);

        // const spotImages = [
        //     { url: previewImage, preview: true },
        // ];

        // if (spotImage1 !== "") spotImages.push({ url: spotImage1, preview: false });
        // if (spotImage2 !== "") spotImages.push({ url: spotImage2, preview: false });
        // if (spotImage3 !== "") spotImages.push({ url: spotImage3, preview: false });
        // if (spotImage4 !== "") spotImages.push({ url: spotImage4, preview: false });

        const newSpot = await dispatch(updateOneSpot(spot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (newSpot) {
            closeModal();
            history.push(`/spots/${newSpot.id}`);
        };

        console.log("newSpot update output", newSpot)
    };

    return (
        <div className="entire-update-form-wrapper">
            <h1>Update your Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a
                reservation</p>
            <form className="update-spot-form" onSubmit={handleSubmit}>
                <label>
                    Country
                    {errors.country && (
                        <span className="errors">{errors.country}</span>
                    )}
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Street Address
                    {errors.address && (
                        <span className="errors">{errors.address}</span>
                    )}
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <div className="update-city-state-container">
                    <div className="update-city-state">
                        <label>
                            City
                            {errors.city && (
                                <span className="errors">{errors.city}</span>
                            )}
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                        <span id="update-comma-separator">,</span>
                        <label>
                            State
                            {errors.state && (
                                <span className="errors">{errors.state}</span>
                            )}
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                {/* <div className="update-lng-lat">
                    <label>
                        Latitude
                        <input
                            type="number"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                        ,
                    </label>
                    <label>
                        Longitude
                        <input
                            type="number"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </label>
                </div> */}
                <h2>Describe your place to guests</h2>
                <p>
                    Mention the best features of your space, any special amenities like
                    fast wifi or parking, and what you love about the neighborhood.
                </p>
                <div className="update-description-input-container">
                    <div id="update-description-input">
                        {errors.description && (
                            <span className="errors">{errors.description}</span>
                        )}
                        <textarea
                            id="update-description-text-area"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please write at least 30 characters"
                            rows="9"
                            cols="33"
                        ></textarea>
                    </div>
                </div>
                <h2>Create a title for your spot</h2>
                <p>
                    Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>
                <div className="update-name-input-container">
                    <div id="update-name-input">
                        {errors.name && (
                            <span className="errors">{errors.name}</span>
                        )}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name of your spot"
                        />
                    </div>
                </div>
                <h2>Set a base price for your spot</h2>
                <p>
                    Competitive pricing can help your listing stand out and rank higher
                    in search results.
                </p>
                <div className="update-price-input-container">
                    <div id="update-price-input">
                        {errors.price && (
                            <span className="errors">{errors.price}</span>
                        )}
                        $ <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"
                        />
                    </div>
                </div>
                {/* <h2>Liven up your spot with photos</h2>
                <p>
                    Submit a link to at least one photo to publish your spot.
                </p>
                <div className="update-image-input">
                    <input
                        type="text"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        placeholder="Preview Image URL"
                    />
                    {imageErrors.previewImage && (
                        <span className="errors">{imageErrors.previewImage}</span>
                    )}
                    <input
                        type="text"
                        value={spotImage1}
                        onChange={(e) => setSpotImage1(e.target.value)}
                        placeholder="Image URL"
                    />
                    {imageErrors.spotImage1 && (
                        <span className="errors">{imageErrors.spotImage1}</span>
                    )}
                    <input
                        type="text"
                        value={spotImage2}
                        onChange={(e) => setSpotImage2(e.target.value)}
                        placeholder="Image URL"
                    />
                    {imageErrors.spotImage2 && (
                        <span className="errors">{imageErrors.spotImage2}</span>
                    )}
                    <input
                        type="text"
                        value={spotImage3}
                        onChange={(e) => setSpotImage3(e.target.value)}
                        placeholder="Image URL"
                    />
                    {imageErrors.spotImage3 && (
                        <span className="errors">{imageErrors.spotImage3}</span>
                    )}
                    <input
                        type="text"
                        value={spotImage4}
                        onChange={(e) => setSpotImage4(e.target.value)}
                        placeholder="Image URL"
                    />
                    {imageErrors.spotImage4 && (
                        <span className="errors">{imageErrors.spotImage4}</span>
                    )}
                </div> */}
                <div id="update-button-container">
                    <button id="update-spot-button" type="submit">
                        Update Spot
                    </button>
                </div>
            </form>
        </div>
    );
};
