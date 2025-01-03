import React, { useState } from "react";
import usePrevious from "./usePrevious";

const UsePreviousApp = () => {
  const [count, setCount] = useState(0);
  const prevValue = usePrevious(count);
  return (
    <div>
      <p>Current Count: {count}</p>
      <p>Prev Count: {prevValue}</p>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        increase count
      </button>
    </div>
  );
};

export default UsePreviousApp;
