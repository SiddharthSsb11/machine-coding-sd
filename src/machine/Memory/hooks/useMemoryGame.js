import { useEffect, useState } from "react";
import { generateGrid } from "../utils/gameUtils";

export default function useMemoryGame() {
  const [cards, setCards] = useState(generateGrid());
  const [isLock, setIsLock] = useState(false);
  const [FlippedCard, setFlippedCard] = useState([]);

  useEffect(() => {
    if (FlippedCard.length === 2) {
      setIsLock(true);
      setTimeout(() => {
        if (cards[FlippedCard[0]].number !== cards[FlippedCard[1]].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[FlippedCard[0]].isFlipped = false;
            copyCards[FlippedCard[1]].isFlipped = false;
            return copyCards;
          });
        }
        setIsLock(false);
        setFlippedCard([]);
      }, 3000);
    }
  }, [FlippedCard]);

  return { cards, isLock, FlippedCard, setFlippedCard, setCards, setIsLock };
}
