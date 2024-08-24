"use client";
import { CARD_NAMES } from "@/app/cardNames";
import { useCardStore } from "@/app/store";
import Fuse from "fuse.js";
import { useState, useEffect, useRef } from "react";

// Configure Fuse options
const options = {
  includeScore: true,
  threshold: 0.3,
  keys: ["name"],
};

// Create a Fuse instance
const fuse = new Fuse(
  CARD_NAMES.map((str) => ({ name: str })),
  options,
);

// Function to perform search and return recommendations
function searchAndRecommend(query: string, limit: number = 5): string[] {
  const results = fuse.search(query);
  return results.slice(0, limit).map((result) => result.item.name);
}

const Searchbar = () => {
  const {query, setQuery} = useCardStore();
  const [results, setResults] = useState<string[]>([]);
  const [showResultsMenu, setShowResultsMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
  };

  useEffect(() => {
    // debounce the search
    const timeout = setTimeout(() => {
      setResults(searchAndRecommend(query));
    }, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  // effect to close the results menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResultsMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [resultsRef, inputRef]);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="flex-1 p-2 rounded-md mr-4"
        onChange={handleChange}
        value={query}
        ref={inputRef}
        onFocus={() => setShowResultsMenu(true)}
      />
      {/* RESULT MENU */}
      {showResultsMenu && results.length > 0 && (
        <div
          className={`absolute z-10 rounded-b-md bg-white shadow-lg min-h-10 top-[42px] border-top`}
          style={{ width: inputRef.current?.clientWidth }}
          ref={resultsRef}
        >
          {results.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(result);
                setShowResultsMenu(false);
              }}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Searchbar;
