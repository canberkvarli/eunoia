"use client";

import React from "react";

interface SearchMyMindProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchMyMind: React.FC<SearchMyMindProps> = ({ query, setQuery }) => {
  return (
    <div className="max-w-screen-lg">
      <div className="relative flex items-center mb-8">
        <input
          type="text"
          placeholder="Search My Mind..."
          autoCapitalize="none"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-[4rem] text-black dark:text-[#A6B4C6] bg-transparent outline-none italic"
        />
      </div>
    </div>
  );
};

export default SearchMyMind;
