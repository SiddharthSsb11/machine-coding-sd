import React, { useRef, useEffect } from "react";

const usePrevious = (value) => {
  const prevref = useRef(value);

  useEffect(() => {
    prevref.current = value;
  }, [value]);

  return prevref.current;
};

export default usePrevious;
