"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 text-[#2D2D2D]">
      <Navbar />

      {/* Large Background Circle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#FFCB47] via-[#FF6666] to-[#66CCFF] opacity-50" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative w-full max-w-4xl text-center py-20 mt-10">
        <motion.h1
          className="text-5xl font-bold leading-tight tracking-tight md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Remember everything. Organize nothing.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-gray-600 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          All your{" "}
          {categories.map((category, index) => (
            <motion.span
              key={index}
              className="mx-1 px-3 py-1 rounded-full border text-sm font-semibold"
              style={{
                borderColor: category.color,
                color: category.color,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 10px ${category.color}`,
              }}
              transition={{ duration: 0.2 }}
            >
              {category.label}
            </motion.span>
          ))}{" "}
          in one single, private place.
        </motion.p>

        {/* Watch the Intro Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-md hover:bg-gray-900 transition">
            Watch the intro
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 text-center text-gray-500">
        <p>
          Made with ❤️ by{" "}
          <Link href="https://github.com/canberkvarli" className="underline">
            Canberk
          </Link>
        </p>
      </footer>
    </main>
  );
}

/* Category Chips (MyMind.com style) */
const categories = [
  { label: "notes", color: "#FFCB47" },
  { label: "bookmarks", color: "#FF6666" },
  { label: "inspiration", color: "#66CCFF" },
  { label: "articles", color: "#66FF99" },
  { label: "images", color: "#A5A5A5" },
];
