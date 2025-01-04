import React, { useState, useRef, useEffect } from "react";
import "./style.css";
const Carousel = ({
  images,
  isLoading = false,
  imageLimit = images.length,
  imagePerSlide,
  onImgClick,
  customPrevButton,
  customNextButton,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  const imageRef = useRef(null);
  let intervalRef = useRef(null);
  // console.log("---current---", imageRef.current);

  const goPrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // console.log(currentImageIndex);
  return (
    <div className="carousel" style={{ width: imagePerSlide * imgWidth }}>
      <div
        onMouseEnter={() => {
          clearInterval(intervalRef.current);
        }}
        onMouseLeave={() => {
          intervalRef.current = setInterval(goNext, 1000);
        }}
        className="image-container"
        style={{ transform: `translateX(-${currentImageIndex * imgWidth}px)` }}
      >
        {images &&
          images.map((image, index) => (
            <img
              onLoad={() => setImgWidth(imageRef?.current?.offsetWidth)}
              src={image.url}
              ref={imageRef}
              key={image.id}
              onClick={() => onImgClick(image, index)}
              alt={image.title}
              className="image"
            />
          ))}
      </div>
      <button className="btn prev" onClick={goPrev}>
        Prev
      </button>
      <button className="btn next" onClick={goNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
