import { useEffect, useRef, useState } from "react";

export default function CountDownTimer() {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleChange = (e, field) => {
    const value = parseInt(e.target.value, 10) || 0;

    const copyTime = { ...time };
    // concatenation isse
    copyTime.hour = parseInt(copyTime.hour) || 0;
    copyTime.minute = parseInt(copyTime.minute) || 0;
    copyTime.second = parseInt(copyTime.second) || 0;

    copyTime[field] = value;
    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;
    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;

    setTime(copyTime);
  };

  const handleStart = () => {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(!isRunning);
    setTime({
      hour: "",
      minute: "",
      second: "",
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const copyPrevTime = { ...prevTime };
          copyPrevTime.second--;
          if (copyPrevTime.second < 0) {
            copyPrevTime.minute--;
            copyPrevTime.second = 59;
            if (copyPrevTime.minute < 0) {
              copyPrevTime.hour--;
              copyPrevTime.minute = 59;
              if (copyPrevTime.hour < 0) {
                clearInterval(intervalRef.current);
                return { hour: "", second: "", minute: "" };
              }
            }
          }
          return copyPrevTime;
        });
      }, 1000);
    }

    return () => {
      console.log("Cleaned up");
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return (
    <div className="container">
      <div className="input-container">
        <input
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
          type="text"
          placeholder="HH"
        />
        :
        <input
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleChange(e, "minute")}
          type="text"
          placeholder="MM"
        />
        :
        <input
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleChange(e, "second")}
          type="text"
          placeholder="SS"
        />
      </div>
      <div className="btn-container">
        <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
