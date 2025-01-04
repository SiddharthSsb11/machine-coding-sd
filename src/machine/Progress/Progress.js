import React, { useState, useEffect } from "react";
import "./style.css";
const Progress = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("--running--");

      setValue((prevValue) => {
        if (prevValue >= 100) {
          clearInterval(intervalId);
        }
        return Math.min(prevValue + 5, 100);
      });
    }, 500);

    return () => {
      console.log("---clear--");
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <div
        style={{
          height: "25px",
          width: "450px",
          border: "1px solid black",
          position: "relative",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <span
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            zIndex: "99",
          }}
        >
          {value}%
        </span>
        <div
          className="progress"
          style={{ transform: `translateX(${value - 100}%)` }}
        ></div>
      </div>
      <p>{value === 100 ? "Completed !!" : "Loading..."}</p>
    </>
  );
};

export default Progress;
