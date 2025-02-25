"use client";

import React from "react";
import NewCard from "@/components/NewCard";
import Card from "@/components/Card";
import { Card as CardType } from "@/components/Card";
import { AnimatePresence } from "framer-motion";

interface CardsContainerProps {
  cards: CardType[];
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
          <Card key={card.id} card={card} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardsContainer;
