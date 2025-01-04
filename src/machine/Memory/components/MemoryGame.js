import useMemoryGame from "../hooks/useMemoryGame";
import GameItem from "./GameItem";

export default function MemoryGame() {
  const { cards, setCards, FlippedCard, setFlippedCard, isLock } =
    useMemoryGame();

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLock) {
      return;
    }
    const copyCards = [...cards];
    copyCards[index].isFlipped = true;
    setCards(copyCards);
    setFlippedCard([...FlippedCard, index]);
  };

  return (
    <div className="grid-container">
      {cards.map(({ id, number, isFlipped }) => {
        return (
          <GameItem
            key={id}
            id={id}
            number={number}
            isFlipped={isFlipped}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}
