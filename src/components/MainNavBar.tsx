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
          className="text-gray-800 dark:text-[#748397] font-bold hover:underline"
        >
          Everything
        </Link>
        <Link
          href="#"
          className="text-gray-500 dark:text-[#748397] hover:underline"
        >
          Spaces
        </Link>
        <Link
          href="#"
          className="text-gray-500 dark:text-[#748397] hover:underline"
          onClick={handleSerendipityClick}
        >
          Serendipity
        </Link>
      </div>
    </nav>
  );
};

export default MainNavBar;
