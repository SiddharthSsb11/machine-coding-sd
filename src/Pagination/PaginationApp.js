import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./style.css";
const PaginationApp = () => {
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(5);

  const fetchData = async () => {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${pageNo}&limit=5`
    );
    const data = await response.json();

    // console.log(data);
    setImages(data);
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <div className="container">
      <div className="image-container">
        {images.map((image, i) => {
          return (
            <img
              key={image.id}
              src={image.download_url}
              alt={image.author}
              className="image"
            />
          );
        })}
      </div>
      <Pagination pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  );
};

export default PaginationApp;
