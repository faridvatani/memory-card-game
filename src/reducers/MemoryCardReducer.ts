import { GameAction, GameState } from "@/types";
import { generateDeck } from "@/utils";
import { INITIAL_SCORE, TIME_PENALTY } from "@/constants";

export const initialState: GameState = {
  deck: generateDeck(),
  flippedIndices: [],
  solvedIndices: [],
  elapsedTime: 0,
  timerStarted: false,
  score: INITIAL_SCORE,
  gameOver: false,
};

export const memoryGameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case "FLIP_CARD":
      if (
        state.flippedIndices.includes(action.index) ||
        state.flippedIndices.length === 2
      ) {
        return state;
      }
      return {
        ...state,
        flippedIndices: [...state.flippedIndices, action.index],
      };
    case "CHECK_MATCH":
      if (state.flippedIndices.length !== 2) {
        return state;
      }
      const [firstIndex, secondIndex] = state.flippedIndices;
      if (state.deck[firstIndex].image === state.deck[secondIndex].image) {
        const solvedIndices = [...state.solvedIndices, firstIndex, secondIndex];
        const gameOver = solvedIndices.length === state.deck.length;
        return {
          ...state,
          solvedIndices,
          score: Math.max(INITIAL_SCORE - state.elapsedTime * TIME_PENALTY, 0),
          flippedIndices: [],
          gameOver,
        };
      }
      const newScore = Math.max(
        INITIAL_SCORE - state.elapsedTime * TIME_PENALTY,
        0,
      );
      return {
        ...state,
        flippedIndices: [],
        score: newScore,
        gameOver: newScore === 0,
      };
    case "INCREMENT_TIME":
      const updatedScore = Math.max(
        INITIAL_SCORE - (state.elapsedTime + 1) * TIME_PENALTY,
        0,
      );
      return {
        ...state,
        elapsedTime: state.elapsedTime + 1,
        score: updatedScore,
        gameOver: updatedScore === 0,
      };
    case "RESET_GAME":
      return initialState;
    case "START_TIMER":
      return {
        ...state,
        timerStarted: true,
      };
    case "STOP_TIMER":
      return {
        ...state,
        timerStarted: false,
      };
    default:
      return state;
  }
};
