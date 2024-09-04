import { useState, useEffect } from "react";
import { generateDeck } from "@/utils";
import { Card } from "@/data/cardData";

const useMemoryGameState = () => {
  const [deck, setDeck] = useState<Card[]>(generateDeck());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [solvedIndices, setSolvedIndices] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(1000);

  // Effect to check for matches when two cards are flipped
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (deck[firstIndex].image === deck[secondIndex].image) {
        setSolvedIndices([...solvedIndices, firstIndex, secondIndex]);
        setScore(1000 - elapsedTime * 10);
      }
      setTimeout(() => setFlippedIndices([]), 350);
    }
  }, [flippedIndices]);

  // Effect to manage the game timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerStarted && solvedIndices.length < deck.length) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (solvedIndices.length === deck.length) {
      setTimerStarted(false);
    }
    return () => clearInterval(timer);
  }, [timerStarted, solvedIndices]);

  // Function to reset the game state
  const resetGame = () => {
    setDeck(generateDeck());
    setFlippedIndices([]);
    setSolvedIndices([]);
    setElapsedTime(0);
    setTimerStarted(false);
    setScore(0);
  };

  return {
    deck,
    flippedIndices,
    solvedIndices,
    elapsedTime,
    timerStarted,
    score,
    setFlippedIndices,
    setTimerStarted,
    resetGame,
  };
};

export default useMemoryGameState;
