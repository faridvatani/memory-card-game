import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";

interface MemoryCardProps {
  card: { image: StaticImageData };
  isFlipped: boolean;
  isSolved: boolean;
  onClick: () => void;
  index: number;
}

const MemoryCard: FC<MemoryCardProps> = ({
  card,
  isFlipped,
  isSolved,
  onClick,
  index,
}) => (
  <div
    className={`relative size-16 sm:size-28 flex justify-center items-center bg-slate-200 rounded-lg transform cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-gray-700 ${
      isFlipped || isSolved ? "rotate-180" : ""
    }`}
    onClick={onClick}
    aria-label={`Card ${index + 1}`}
    aria-pressed={isFlipped || isSolved}
  >
    {isFlipped || isSolved ? (
      <Image
        src={card.image}
        alt="card"
        className="object-cover rotate-180 size-16 sm:size-24 rounded-lg"
      />
    ) : (
      <div className="absolute inset-0 bg-slate-400 rounded-md box-border" />
    )}
  </div>
);

export default MemoryCard;
