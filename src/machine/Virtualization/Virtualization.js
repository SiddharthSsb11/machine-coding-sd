import React from "react";
import VirtualizedList from "./VirtualizedList";

// const listing = [...Array(100).keys()];
//const count = 100;
const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

const Virtualization = () => {
  // console.log("---list--", LIST);
  return (
    <VirtualizedList list={LIST} height={400} width={300} itemHeight={35} />
  );
};

export default Virtualization;
