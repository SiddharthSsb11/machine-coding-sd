import React, { useEffect, useState } from "react";
import Progress from "./Progress";

const ProgresApp = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        marginTop: "20px",
        width: "100%",
        // border: "1px solid black",
      }}
    >
      {show && (
        <>
          <Progress />
        </>
      )}
      <button onClick={() => setShow(!show)}>
        {" "}
        {!show ? "Start" : "Re-Start"}
      </button>
    </div>
  );
};

export default ProgresApp;
