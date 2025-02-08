"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const EmptyMind: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Your mind is empty
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Create your first card and capture your brilliant ideas.
        </p>
        <button
          onClick={openModal}
          className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Create a Card
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.6, ease: "easeIn" },
              }}
              className="relative bg-white dark:bg-gray-800 w-full h-full p-8"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-800 dark:text-gray-200 hover:text-gray-600"
                aria-label="Close modal"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="h-full flex items-center justify-center">
                <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200">
                  Create Your Card
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmptyMind;
