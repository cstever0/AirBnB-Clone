import { useEffect, useState } from "react";
import "./ReviewForm.css";

const StarsRatingInput = ({ stars, onChange }) => {
  const [activeStars, setActiveStars] = useState(stars);

  useEffect(() => {
    setActiveStars(stars);
  }, [stars])

  return (
    <>
      <div className="rating-input">
        <div className="stars" onMouseEnter={() => setActiveStars(1) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(1)}>
          <i className={activeStars >= 1 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className="stars" onMouseEnter={() => setActiveStars(2) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(2)}>
        <i className={activeStars >= 2 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className="stars" onMouseEnter={() => setActiveStars(3) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(3)}>
        <i className={activeStars >= 3 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className="stars" onMouseEnter={() => setActiveStars(4) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(4)}>
        <i className={activeStars >= 4 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className="stars" onMouseEnter={() => setActiveStars(5) } onMouseLeave={() => setActiveStars(stars)} onClick={() => onChange(5)}>
        <i className={activeStars >= 5 ? "fas fa-star" : "far fa-star"}></i>
        </div>
      </div>
    </>
  );
};

export default StarsRatingInput;
