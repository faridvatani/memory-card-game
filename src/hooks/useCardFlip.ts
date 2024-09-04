import { useEffect } from "react";
import { FLIP_DELAY } from "@/constants";
import { GameAction, GameState } from "@/types";

const useCardFlip = (
  state: GameState,
  dispatch: React.Dispatch<GameAction>,
) => {
  useEffect(() => {
    if (state.flippedIndices.length === 2) {
      const timer = setTimeout(() => {
        dispatch({ type: "CHECK_MATCH" });
      }, FLIP_DELAY);
      return () => clearTimeout(timer);
    }
  }, [dispatch, state.flippedIndices]);
};

export default useCardFlip;
