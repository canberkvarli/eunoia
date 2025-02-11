"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FocusedCardModal from "@/components/FocusedCard";

const EmptyMind = ({ userId }: { userId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-center">
        <h2 className="text-[8rem] font-bold mb-4 text-gray-800 dark:text-gray-200">
          Your mind is empty
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Create your first card and capture your brilliant ideas.
        </p>
        <button
          onClick={openModal}
          className="px-8 py-4 bg-[#FF5925] text-white rounded-full hover:opacity-80 transition"
        >
          Create a Card
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <FocusedCardModal userId={userId} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmptyMind;
