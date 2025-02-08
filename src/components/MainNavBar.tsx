"use client";

import React from "react";
import Link from "next/link";

const MainNavBar: React.FC = () => {
  const handleSerendipityClick = () => {
    console.log("Serendipity clicked");
    // Add your serendipity logic here
  };

  return (
    <nav className="flex items-center justify-end px-5 h-12 bg-transparent font-sans text-xl me-20">
      <div className="flex space-x-6">
        <Link
          href="/everything"
          className="text-gray-800 dark:text-gray-200 font-bold hover:underline"
        >
          Everything
        </Link>
        <Link
          href="/spaces"
          className="text-gray-500 dark:text-gray-300 hover:underline"
        >
          Spaces
        </Link>
        <button
          className="text-gray-500 dark:text-gray-300 hover:underline"
          onClick={handleSerendipityClick}
        >
          Serendipity
        </button>
      </div>
    </nav>
  );
};

export default MainNavBar;
