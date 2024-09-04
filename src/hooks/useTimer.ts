import { useEffect } from "react";
import { TIMER_INTERVAL } from "@/constants";
import { GameAction, GameState } from "@/types";

const useTimer = (state: GameState, dispatch: React.Dispatch<GameAction>) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.timerStarted && !state.gameOver) {
      timer = setInterval(() => {
        dispatch({ type: "INCREMENT_TIME" });
      }, TIMER_INTERVAL);
    } else if (state.gameOver) {
      dispatch({ type: "STOP_TIMER" });
    }
    return () => clearInterval(timer);
  }, [state.timerStarted, state.gameOver, dispatch]);
};

export default useTimer;
