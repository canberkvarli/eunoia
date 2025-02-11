"use client";

import React from "react";
import Link from "next/link";
import NewCard from "@/components/NewCard";
import { Card } from "./MyMind";
import { motion, AnimatePresence } from "framer-motion";

interface CardsContainerProps {
  cards: Card[];
  userId: string;
}

const CardsContainer: React.FC<CardsContainerProps> = ({ cards, userId }) => {
  return (
    <div
      className="grid gap-6 font-sans"
      style={{
        gridTemplateColumns: "250px repeat(auto-fit, minmax(250px, 300px))",
      }}
    >
      <NewCard userId={userId} />

      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/cards/${card.id}`}>
              <div
                className="rounded-lg shadow p-4 text-white dark:text-[#A6B4C6] bg-[#FFFFFF] dark:bg-[#1D1F28] break-words cursor-pointer"
                style={{ minHeight: "auto" }}
              >
                <h3 className="text-xl text-black dark:text-[#A6B4C6] font-bold mb-2">
                  {card.title}
                </h3>
                <p className="text-black text-sm dark:text-[#A6B4C6]">
                  {card.body}
                </p>
                {card.tags && card.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {card.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-black text-sm bg-gray-200 dark:bg-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardsContainer;
