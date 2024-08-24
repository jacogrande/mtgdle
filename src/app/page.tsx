"use client";
import { getRandomCard } from "@/app/getRandomCard";
import { ImageDisplay } from "@/app/ImageDisplay";
import Searchbar from "@/app/Searchbar";
import { useCardStore } from "@/app/store";
import { useEffect } from "react";

export default function Home() {
  const { currentCard, setCurrentCard, query, round, setRound, setRevealed  } =
    useCardStore();

  const getNextCard = async () => {
    const card = await getRandomCard();
    setRound(1);
    setRevealed(false);
    setCurrentCard(card);
  };

  const guess = async () => {
    if (query === currentCard?.name) {
      alert("Correct!");
      revealCard();
      return;
    }
    if (round === 5) {
      revealCard();
      return;
    }
    setRound(round + 1);
  };

  const revealCard = () => {
    setRevealed(true);
    setRound(5);
  }

  useEffect(() => {
    getNextCard();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-200">
      <h1 className="text-4xl font-bold mb-16">MTGdle</h1>
      <div className="w-[480px] flex justify-between items-center relative">
        <Searchbar />
        <button
          className="bg-rose-500 p-2 rounded-lg font-medium text-white"
          onClick={guess}
        >
          Guess
        </button>
      </div>
      {currentCard && <ImageDisplay />}
      <div className="w-[480px] mt-4 flex justify-end">
        <button onClick={revealCard} className="text-rose-700/70 mr-4">Reveal</button>
        <button onClick={getNextCard} className="text-rose-700/70">Reset</button>
      </div>
    </main>
  );
}
