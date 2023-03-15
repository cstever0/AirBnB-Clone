import { useState } from "react";
import "./ReviewForm.css";

const StarsRatingInput = ({ stars, onChange }) => {
  const [activeStars, setActiveStars] = useState(stars);

  return (
    <>
      <input
        type="number"
        value={stars}
        onChange={onChange}
      />
      <div className="rating-input">
        <div className={activeStars >= 1 ? "filled" : "empty"} onMouseEnter={() => setActiveStars(1) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(1)}>
          <i className="fa fa-star"></i>
        </div>
        <div className={activeStars >= 2 ? "filled" : "empty"} onMouseEnter={() => setActiveStars(2) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(2)}>
        <i className="fa fa-star"></i>
        </div>
        <div className={activeStars >= 3 ? "filled" : "empty"} onMouseEnter={() => setActiveStars(3) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(3)}>
          <i className="fa fa-star"></i>
        </div>
        <div className={activeStars >= 4 ? "filled" : "empty"} onMouseEnter={() => setActiveStars(4) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(4)}>
          <i className="fa fa-star"></i>
        </div>
        <div className={activeStars === 5 ? "filled" : "empty"} onMouseEnter={() => setActiveStars(5) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(5)}>
          <i className="fa fa-star"></i>
        </div>
      </div>
    </>
  );
};

export default StarsRatingInput;
