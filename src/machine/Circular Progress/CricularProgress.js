import "./App.css";

import { styled, keyframes } from "styled-components";

function CricularProgress(props) {
  const progress = props.percentage; // from app js where you maintain the percentage level

  return (
    <OuterCircle percentage={progress}>
      <div className="inner-circle">
        <h1>{progress}%</h1>
      </div>
    </OuterCircle>
  );
}

export default CricularProgress;

const progressAnimate = (percentage) => keyframes`
  0% {background: conic-gradient(blue 0deg, rgb(228, 225, 225) 0deg);}
  100% {background: conic-gradient(blue ${
    (percentage / 100) * 360
  }deg, rgb(228, 225, 225) 0deg);}
`;

const OuterCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${(props) => progressAnimate(props.percentage)} 2s forwards;
`;
