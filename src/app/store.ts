import { CardData } from "@/app/types";
import { create } from "zustand";

type Store = {
  currentCard: CardData | null;
  setCurrentCard: (card: CardData) => void;
  round: number;
  setRound: (round: number) => void;
  query: string;
  setQuery: (query: string) => void;
  revealed: boolean;
  setRevealed: (revealed: boolean) => void;
};

export const useCardStore = create<Store>((set) => ({
  currentCard: null,
  round: 1,
  query: "",
  revealed: false,
  setCurrentCard: (card: CardData) => set({ currentCard: card }),
  setRound: (round: number) => set({ round }),
  setQuery: (query: string) => set({ query }),
  setRevealed: (revealed: boolean) => set({ revealed }),
}));
