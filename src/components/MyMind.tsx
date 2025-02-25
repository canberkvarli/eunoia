"use client";

import { useState, useEffect } from "react";
import SearchMyMind from "@/components/SearchMyMind";
import { Card as CardType } from "@/components/Card";
import CardsContainer from "@/components/CardsContainer";
import { searchCards } from "@/actions/searchActions";

interface MyMindProps {
  userId: string;
  initialCards: CardType[];
}

const MyMind: React.FC<MyMindProps> = ({ userId, initialCards }) => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<CardType[]>(initialCards);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        searchCards(userId, query).then((results) => {
          setCards(results?.map(card => ({ ...card, tags: [] })) || []);
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
