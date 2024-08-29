"use client";
import React, { FC } from "react";
import ResetButton from "../ui/ResetButton";
import MemoryCard from "../ui/MemoryCard";
import useMemoryGameState from "@/hooks/useMemoryGameState";

const MemoryGame: FC = () => {
  const {
    deck,
    flippedIndices,
    solvedIndices,
    elapsedTime,
    timerStarted,
    score,
    setFlippedIndices,
    setTimerStarted,
    resetGame,
  } = useMemoryGameState();

  // Function to handle card flip logic
  const handleCardFlip = (index: number) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }

    if (!flippedIndices.includes(index) && flippedIndices.length < 2) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  // Check if the game is over
  const isGameOver = solvedIndices.length === deck.length;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-0 md:p-4">
        <span className="text-sm md:text-lg text-center font-semibold">
          Elapsed Time:{" "}
          <span className="text-base md:text-xl font-bold">{elapsedTime}</span>{" "}
          seconds
        </span>
        <div className="grid grid-cols-4 gap-2 md:gap-4 relative">
          {isGameOver && (
            <div
              className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-sm bg-slate-900 bg-opacity-50 z-10 border-4 border-slate-400 rounded-lg"
              role="alert"
              aria-live="assertive"
            >
              <h2 className="text-4xl text-center font-semibold text-green-500 animate-bounce">
                You Won, Congrats!
              </h2>
              <span className="text-2xl text-center text-white font-semibold mt-4">
                Score: {score} points
              </span>
            </div>
          )}
          {deck.map((card, index) => (
            <MemoryCard
              key={index}
              card={card}
              isFlipped={flippedIndices.includes(index)}
              isSolved={solvedIndices.includes(index)}
              onClick={() => handleCardFlip(index)}
              index={index}
            />
          ))}
        </div>
        <ResetButton onClick={resetGame} />
      </div>
    </>
  );
};

export default MemoryGame;
