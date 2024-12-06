import React from "react";
import "./style.css";

const Pagination = ({ pageNo, setPageNo }) => {
  const prevPageNoArray = Array.from(
    { length: 3 },
    (_, index) => pageNo - 1 - index
  )
    .filter((value) => value > 0)
    .reverse();
  const nextPageNoArray = Array.from(
    { length: 4 },
    (_, index) => pageNo + index
  );

  const paginationArray = [...prevPageNoArray, ...nextPageNoArray];
  console.log(pageNo);
  console.log(paginationArray);
  return (
    <div className="button-container">
      {pageNo > 1 ? (
        <button
          className="button"
          onClick={() => setPageNo((prevPageNo) => prevPageNo - 1)}
        >
          {`<`}
        </button>
      ) : (
        <></>
      )}
      {paginationArray.map((value, index) => {
        return (
          <button
            className={value === pageNo ? `button active` : `button`}
            key={index}
            onClick={() => setPageNo(value)}
          >
            {value}
          </button>
        );
      })}

      <button
        className="button"
        onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)}
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
