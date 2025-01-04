import { useState } from "react";

export default function VirtualizedList({ list, height, width, itemHeight }) {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);

  const handleScroll = (e) => {
    const { scrollTop } = e.target; // px amount that we have scroll down in that div
    const newStartIndex = Math.floor(scrollTop / itemHeight); //newStartIndex ofr the indices in our virtualized list
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight); // same useState
    setIndices([newStartIndex, newEndIndex]);
  };

  const visibleList = list.slice(indices[0], indices[1] + 1); // [0, Math.floor(height / itemHeight)] // indices[1] + 1 //so that last item is also included in subset
  return (
    <div
      className="container"
      onScroll={handleScroll}
      style={{ height, width, background: "grey", overflow: "auto" }}
    >
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          return (
            <div
              className="item"
              style={{
                height: itemHeight,
                background: "coral",
                borderTop: "5px solid grey",
                position: "absolute",
                top: (indices[0] + index) * itemHeight, //shifting the list elements down by the amount we have scrolled
                // calculation determines the absolute vertical position (top) of the current item relative to the top of the parent container.
                width: "100%",
                textAlign: "center",
                color: "whitesmoke",
              }}
            >
              {"Item " + item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
