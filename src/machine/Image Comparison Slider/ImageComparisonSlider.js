import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import "./styles.css";

const ImageComparisonSlider = ({
  image1,
  image2,
  width = "500px",
  height = "500px",
}) => {
  const imageRef = useRef(null);
  const sliderRef = useRef(null);
  const overlayRef = useRef(null);
  const [canStart, setCanStart] = useState(false);
  const [imageWidth, setIamgeWidth] = useState(0);

  const slideStart = (e) => {
    setCanStart(true);
  };

  const slideEnd = (e) => {
    setCanStart(false);
  };

  const slideMove = (e) => {
    let pos,
      w = imageWidth;

    if (!canStart) return;

    if (!sliderRef.current || !overlayRef.current) return;

    pos = getCursorPos(e);

    /* Prevent the slider from being positioned outside the image: */
    if (pos < 0) pos = 0;
    if (pos > w) pos = w;

    /* Execute a function that will resize the overlay image according to the cursor: */
    slide(pos);
  };

  const getCursorPos = (e) => {
    let a,
      x = 0;
    e = e || window.event;

    /* Get the x positions of the image: */
    a = imageRef.current.getBoundingClientRect();

    /* Calculate the cursor's x coordinate, relative to the image: */
    x = e.pageX - a.left;

    /* Consider any page scrolling: */
    x = x - window.pageXOffset;

    return x;
  };

  const slide = (x) => {
    /* Resize the image: */
    overlayRef.current.style.width = x + "px";
    /* Position the slider: */
    sliderRef.current.style.left = x + "px";
  };

  useEffect(() => {
    // on mouse move
    window.addEventListener("mousemove", slideMove, false);
    window.addEventListener("touchmove", slideMove, false);

    // on mouse leave
    window.addEventListener("mouseup", slideEnd, false);
    window.addEventListener("touchend", slideEnd, false);

    if (imageRef.current) {
      setIamgeWidth(imageRef.current.offsetWidth);
    }

    return () => {
      window.removeEventListener("mousemove", slideMove, false);
      window.removeEventListener("touchmove", slideMove, false);
      window.removeEventListener("mouseup", slideEnd, false);
      window.removeEventListener("touchend", slideEnd, false);
    };
  }, [canStart]);

  const dimension = {
    width,
    height,
  };

  return (
    <div className="container">
      <div>
        <img src={image1} style={dimension} alt="Compare 1" />
      </div>
      <div ref={overlayRef} className={cx("image", "overlay")}>
        <img src={image2} ref={imageRef} style={dimension} alt="Compare 2" />
      </div>
      <span
        className="slider"
        ref={sliderRef}
        onMouseDown={slideStart}
        onTouchStart={slideStart}
      ></span>
    </div>
  );
};

export default ImageComparisonSlider;
