"use client";

import React from "react";

const SearchMyMind: React.FC = () => {
  return (
    <div className="max-w-screen-lg">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search My Mind..."
          autoCapitalize="none"
          autoFocus
          className="flex-1 text-[4rem] dark:text-[#748397] bg-transparent outline-none italic"
        />
      </div>
    </div>
  );
};

export default SearchMyMind;
