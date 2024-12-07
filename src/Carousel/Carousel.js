import React, { useState, useRef, useEffect } from "react";
import data from "./data.json";
import styles from "./style.module.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const goPrev = (index) => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return data.length - 1;
      }

      return prevIndex - 1;
    });
  };

  const goNext = (index) => {
    setCurrentIndex((prevIndex) => {
      //   console.log(prevIndex + " updated");
      if (prevIndex === data.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };
  console.log(currentIndex);

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <>
      <div
        className={styles.carousel}
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={() => {
          intervalRef.current = setInterval(goNext, 1000);
        }}
      >
        <button
          className={`${styles.button} ${styles.left}`}
          onClick={() => goPrev(currentIndex)}
        >{`<`}</button>
        <img
          src={data[currentIndex]?.download_url}
          alt=""
          className={styles.image}
        />
        <button
          className={`${styles.button} ${styles.right}`}
          onClick={() => goNext(currentIndex)}
        >{`>`}</button>
      </div>
    </>
  );
};

export default Carousel;
