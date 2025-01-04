import { memo } from "react";

export default memo(function GameItem({ isFlipped, id, handleClick, number }) {
  return (
    <button className="cards" key={id} onClick={() => handleClick(id)}>
      {isFlipped ? number : "?"}
    </button>
  );
});
