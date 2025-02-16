"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const SideNavbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <aside className="w-16 min-h-screen flex flex-col justify-between items-center p-4 bg-transparent">
      <div className="w-full flex justify-center mt-[10rem]">
        <Link
          href="/everything"
          className="transform rotate-90 text-5xl dark:text-[#748397]"
        >
          Eunoia
        </Link>
      </div>
      <div className="flex flex-col space-y-6">
        <ModeToggle />
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-800 dark:text-[#748397] hover:text-blue-500"
          aria-label="Grid layout"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-8 h-8 flex items-center justify-center text-gray-800 dark:text-[#748397] hover:text-blue-500"
          aria-label="Log out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;
