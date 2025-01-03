import React, { useState } from "react";
import data from "../data.json";
import Accordion from "./Accordion";
import "./FAQ.css";
const FAQ = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const toggleAccordion = (index) => {
    console.log("--selectedIndex faq---", selectedIndex);
    setSelectedIndex(selectedIndex === index ? null : index);
  };
  return (
    <div style={{ padding: "1em" }}>
      <h1>FAQ</h1>
      {data.map((item, index) => (
        <div key={item.id} className="main">
          <Accordion
            data={item}
            index={index}
            selectedIndex={selectedIndex}
            toggleAccordion={toggleAccordion}
          />
        </div>
      ))}
    </div>
  );
};

export default FAQ;
