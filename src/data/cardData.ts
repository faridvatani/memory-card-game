import { StaticImageData } from "next/image";
import {
  donut,
  frenchFries,
  friedEgg,
  hotDog,
  iceCream,
  pizza,
  sandwich,
  taco,
} from "@/assets";

// Interface for a card object, which includes an image property
export interface Card {
  image: StaticImageData;
}

// Array of card objects, each with a unique image
export const cards: Card[] = [
  { image: donut },
  { image: frenchFries },
  { image: friedEgg },
  { image: hotDog },
  { image: iceCream },
  { image: pizza },
  { image: sandwich },
  { image: taco },
];
