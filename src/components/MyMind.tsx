"use client";

import { useState, useEffect } from "react";
import SearchMyMind from "@/components/SearchMyMind";

export interface Card {
  id: string;
  title?: string | null;
  body: string;
  tags: string[];
  createdAt: Date;
}

import CardsContainer from "@/components/CardsContainer";
import { searchCards } from "@/actions/searchActions";

interface MyMindProps {
  userId: string;
  initialCards: Card[];
}

const MyMind: React.FC<MyMindProps> = ({ userId, initialCards }) => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<Card[]>(initialCards);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        searchCards(userId, query).then((results) => {
          setCards(results || []);
        });
      } else {
        setCards(initialCards);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, userId, initialCards]);

  return (
    <div className="p-4">
      <SearchMyMind query={query} setQuery={setQuery} />
      <CardsContainer cards={cards} userId={userId} />
    </div>
  );
};

export default MyMind;
