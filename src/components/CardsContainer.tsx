// src/components/CardsContainer.tsx
"use client";

import React from "react";
import NewCard from "@/components/NewCard";

interface Card {
  id: string;
  title?: string | null;
  body: string;
  tags: string[];
  createdAt: Date;
}

interface CardsContainerProps {
  cards: Card[];
  userId: string;
}

const CardsContainer: React.FC<CardsContainerProps> = ({ cards, userId }) => {
  return (
    <div className="space-y-8">
      <NewCard userId={userId} />

      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-xl mx-auto"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {card.title || "Untitled"}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{card.body}</p>
          {card.tags && card.tags.length > 0 && (
            <div className="mt-2">
              {card.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-2 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-2 text-xs text-gray-500">
            {card.createdAt.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsContainer;
