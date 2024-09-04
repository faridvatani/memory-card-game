import { cards } from "@/data";
import { Card } from "@/types";

// Function to shuffle an array using the Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

// Function to generate a deck of cards by duplicating and shuffling the original cards array
export const generateDeck = (): Card[] => {
  return shuffleArray([...cards, ...cards]);
};
