import React, { useEffect, useState } from "react";
import "./style.css";
import { useRef } from "react";
const Timer = () => {
  const [time, setTime] = useState({
    hour: "",
    min: "",
    sec: "",
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const handleInput = (e, field) => {
    // const value = e.target.value;
    const value = parseInt(e.target.value, 10) || 0;

    // const normalizedTime = { ...time };
    // normalizedTime[field] = value;
    // normalizedTime.min += Math.floor(normalizedTime.sec / 60);
    // normalizedTime.sec = normalizedTime.sec % 60;
    // normalizedTime.hour += Math.floor(normalizedTime.min / 60);
    // normalizedTime.min = normalizedTime.min % 60;

    // setTime(normalizedTime);
    setTime((prevTime) => ({
      ...prevTime,
      [field]: value,
    }));
    // console.log(time, value, field);
  };

  const handleStart = () => {
    if (time.hour === 0 && time.min === 0 && time.sec === 0) {
      return;
    }

    setTime((prevTime) => {
      const normalizedTime = { ...prevTime };

      normalizedTime.min += Math.floor(normalizedTime.sec / 60);
      normalizedTime.sec = normalizedTime.sec % 60;
      normalizedTime.hour += Math.floor(normalizedTime.min / 60);
      normalizedTime.min = normalizedTime.min % 60;

      return normalizedTime;
    });

    // const normalizedTime = { ...time };

    // normalizedTime.min += Math.floor(normalizedTime.sec / 60);
    // normalizedTime.sec = normalizedTime.sec % 60;
    // normalizedTime.hour += Math.floor(normalizedTime.min / 60);
    // normalizedTime.min = normalizedTime.min % 60;

    // setTime(normalizedTime);
    // console.log("--start", { time });
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(!isRunning);
    setTime({ hour: "", min: "", sec: "" });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const copyPrevTime = { ...prevTime };
          copyPrevTime.sec--;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <h2>Stopwatch</h2>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px auto",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <input
          disabled={isRunning}
          value={time.hour}
          type="text"
          placeholder="HH"
          className="in"
          onChange={(e) => handleInput(e, "hour")}
        />
        <input
          disabled={isRunning}
          value={time.min}
          type="text"
          placeholder="MM"
          className="in"
          onChange={(e) => handleInput(e, "min")}
        />
        <input
          disabled={isRunning}
          value={time.sec}
          type="text"
          placeholder="SS"
          className="in"
          onChange={(e) => handleInput(e, "sec")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <button onClick={handleStart}> Start</button>
        <button onClick={handleReset}> Reset</button>
      </div>
    </div>
  );
};

export default Timer;
