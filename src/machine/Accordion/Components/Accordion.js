import React, { useState } from "react";
import "./FAQ.css";

const Accordion = ({ data, index, selectedIndex, toggleAccordion }) => {
  const isOpen = selectedIndex === index;
  return (
    <div>
      <h2 style={{ position: "relative" }}>
        {data.question}{" "}
        <span
          style={{ position: "absolute", right: "1em", cursor: "pointer" }}
          onClick={() => toggleAccordion(index)}
        >
          {isOpen ? "-" : "+"}
        </span>
      </h2>
      {isOpen && <p>{data.answer} </p>}
    </div>
  );
};

export default Accordion;
