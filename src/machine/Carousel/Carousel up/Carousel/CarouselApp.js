/* Build a Highly Scalable Carousel Component in React JS

 Requirements:
  - We want to create a carousel component which takes array of images as input.
  - The component should efficiently handle a large number of images while maintaining 
  scalability, performance optimizations, and extensibility.
  - Provide callback functions for events like image click, enabling users to define 
  custom behavior.
  - Focus on Accessibility.
*/

import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import "./style.css";
const CarouselApp = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (limitNum) => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${limitNum}`
      );
      const res = await data.json();
      setImages(res);
    } catch (error) {
      console.log("error occured", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(10);
  }, []);

  return (
    <div>
      <Carousel
        className="carousel-container"
        images={images}
        imagePerSlide={1}
        isLoading={loading}
        imageLimit={4}
        onImgClick={(image, index) => {}}
        customPrevButton={(onClick) => (
          <button
            className="btn prev"
            style={{ background: "red" }}
            onClick={onClick}
          >
            Prev
          </button>
        )}
        customNextButton={(onClick) => (
          <button
            className="btn next"
            style={{ background: "blue" }}
            onClick={onClick}
          >
            Next
          </button>
        )}
      />
    </div>
  );
};

export default CarouselApp;
