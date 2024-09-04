import { StaticImageData } from "next/image";

export type Card = {
  image: StaticImageData;
};

export type GameState = {
  deck: Card[];
  flippedIndices: number[];
  solvedIndices: number[];
  elapsedTime: number;
  timerStarted: boolean;
  score: number;
  gameOver: boolean;
};

export type GameAction =
  | { type: "FLIP_CARD"; index: number }
  | { type: "CHECK_MATCH" }
  | { type: "INCREMENT_TIME" }
  | { type: "START_TIMER" }
  | { type: "STOP_TIMER" }
  | { type: "GAME_OVER" }
  | { type: "RESET_GAME" };
