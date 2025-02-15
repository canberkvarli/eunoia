"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card as CardType } from "./MyMind";

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  // Determine if content is "too much" based on a threshold (e.g., 300 characters).
  const isContentTooMuch = card.body.length > 300;

  // Adjust the font size based on the length of the card body.
  const getFontSize = (text: string): string => {
    if (text.length > 600) return "0.7rem";
    if (text.length > 300) return "0.9rem";
    return "1rem";
  };

  const fontSize = getFontSize(card.body);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/cards/${card.id}`}>
        <div className="rounded-lg shadow pt-4 pb-4 pl-4 pr-[2px] text-white dark:text-[#A6B4C6] bg-[#FFFFFF] dark:bg-[#1D1F28] break-words cursor-pointer">
          <div
            className="relative"
            style={{
              height: isContentTooMuch ? "300px" : "auto",
              overflow: "hidden",
            }}
          >
            <p
              className="text-black dark:text-[#A6B4C6] m-0"
              style={{
                fontSize,
                lineHeight: "1.4",
              }}
            >
              {card.body}
            </p>

            {isContentTooMuch && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "50px",
                  background:
                    "linear-gradient(transparent, rgba(166, 163, 163, 0.2))",
                }}
              />
            )}
          </div>

          {card.tags && card.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {card.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded text-[#8A96A7] text-sm bg-gray-200 dark:bg-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
      <h3 className="flex justify-center font-nunito text-sm mt-2 text-[#748297] dark:text-[#545F6F] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {card.title}
      </h3>
    </motion.div>
  );
};

export default Card;
