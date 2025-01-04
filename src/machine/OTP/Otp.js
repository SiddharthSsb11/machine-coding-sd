import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";

const Otp = ({ otpLength = 6 }) => {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const inputRef = useRef([]);

  const handleInput = (e, index) => {
    const key = e.key;
    console.log(key, index);

    if (key === "ArrowLeft") {
      if (index > 0) inputRef.current[index - 1].focus();
      return;
    }

    if (key === "ArrowRight") {
      if (index + 1 < otpFields.length) inputRef.current[index + 1].focus();
      return;
    }

    const copyOtpFields = [...otpFields];

    if (key === "Backspace") {
      copyOtpFields[index] = "";
      if (index > 0) inputRef.current[index - 1].focus();
      setOtpFields(copyOtpFields);
    }

    if (isNaN(key)) {
      return;
    }
    copyOtpFields[index] = key;
    if (index + 1 < otpFields.length) inputRef.current[index + 1].focus();
    setOtpFields(copyOtpFields);
  };

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  return (
    <React.Fragment>
      {otpFields.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            value={value}
            className={styles.input}
            ref={(currentInput) => (inputRef.current[index] = currentInput)}
            onKeyDown={(e) => handleInput(e, index)}
          ></input>
        );
      })}
    </React.Fragment>
  );
};

export default Otp;
