import React, { useState } from "react";
import "./style.css";
const starCount = Array.from({ length: 10 }, (_, index) => index);
const count = 10;
const Star = () => {
  const [rating, setRating] = useState();
  const [hoverValue, setHoverValue] = useState(0);

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleHover = (index) => {
    setHoverValue(index + 1);
  };

  return (
    <div className="container">
      {new Array(count).fill(0).map((item, index) => {
        return (
          <span
            key={index}
            className={`star ${index < (hoverValue || rating) ? "gold" : ""}`}
            onClick={() => handleRating(index)}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setHoverValue(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Star;
