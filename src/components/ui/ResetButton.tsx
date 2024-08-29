import React, { FC } from "react";

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: FC<ResetButtonProps> = ({ onClick }) => (
  <button
    className="relative col-span-1 bg-slate-200 p-4 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
    aria-label="Reset Game"
    onClick={onClick}
  >
    Reset Game
  </button>
);

export default ResetButton;
