"use client";
import React, { FC, useCallback, useReducer } from "react";
import ResetButton from "@/components/ui/ResetButton";
import MemoryCard from "@/components/ui/MemoryCard";
import { initialState, memoryGameReducer } from "@/reducers/MemoryCardReducer";
import useTimer from "@/hooks/useTimer";
import useCardFlip from "@/hooks/useCardFlip";

const MemoryGame: FC = () => {
  const [state, dispatch] = useReducer(memoryGameReducer, initialState);

  useTimer(state, dispatch);
  useCardFlip(state, dispatch);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

  const handleCardFlip = useCallback(
    (index: number) => {
      if (
        state.flippedIndices.length < 2 &&
        !state.flippedIndices.includes(index)
      ) {
        if (!state.timerStarted) {
          dispatch({ type: "START_TIMER" });
        }
        dispatch({ type: "FLIP_CARD", index });
      }
    },
    [state.flippedIndices, state.timerStarted],
  );

  const isGameOver = state.gameOver;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-0 md:p-4">
        <span className="text-sm md:text-lg text-center font-semibold">
          Elapsed Time:{" "}
          <span className="text-base md:text-xl font-bold">
            {state.elapsedTime}
          </span>{" "}
          seconds
        </span>
        <div className="grid grid-cols-4 gap-2 md:gap-4 relative">
          {isGameOver && (
            <div
              className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-sm bg-slate-900 bg-opacity-50 z-10 border-4 border-slate-400 rounded-lg"
              role="alert"
              aria-live="assertive"
            >
              <h2
                className={`text-4xl text-center font-semibold animate-bounce ${
                  state.score > 0 ? "text-green-500" : "text-rose-500"
                }`}
              >
                {state.score > 0 ? "You Won, Congrats!" : "Time's Up!"}
              </h2>
              <span className="text-2xl text-center text-white font-semibold mt-4">
                Score: {state.score} points
              </span>
            </div>
          )}
          {state.deck.map((card, index) => (
            <MemoryCard
              key={index}
              card={card}
              isFlipped={state.flippedIndices.includes(index)}
              isSolved={state.solvedIndices.includes(index)}
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
