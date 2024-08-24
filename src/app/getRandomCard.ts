import { isCardData } from "@/app/types";

export const getRandomCard = async () => {
  const response = await fetch("https://api.scryfall.com/cards/random?q=-t:land cube:modern not:reprint");
  if(!response.ok) {
    throw new Error("Failed to fetch random card");
  }
  const data = await response.json();
  if(!isCardData(data)) {
    throw new Error("Invalid card data");
  }
  return data;
}
