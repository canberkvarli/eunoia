"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { createCard } from "@/actions/cardActions";

interface FocusedCardModalProps {
  userId: string;
  onClose: () => void;
}

const modalVariants = {
  hidden: {
    clipPath: "inset(50% 50% 50% 50%)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    clipPath: "inset(50% 50% 50% 50%)",
    opacity: 0,
    transition: { duration: 0.8, ease: "easeIn" },
  },
};

const FocusedCardModal: React.FC<FocusedCardModalProps> = ({
  userId,
  onClose,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <form
          ref={formRef}
          action={createCard}
          className="relative w-full h-full bg-transparent flex flex-col"
        >
          {/* Hidden inputs */}
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="tags" value="" />

          {/* Close button (top-right) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white"
            aria-label="Close modal"
          >
            <ArrowDownRight className="w-8 h-8 rotate-45" />
          </button>

          {/* Title input */}
          <div className="p-4">
            <input
              ref={titleRef}
              type="text"
              name="title"
              placeholder="Type your headline here."
              className="w-full text-4xl bg-transparent border-b border-gray-300 focus:outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* Body textarea */}
          <div className="flex-1 p-4">
            <textarea
              name="body"
              autoFocus
              placeholder="Start writing right here..."
              className="w-full h-full bg-transparent text-xl focus:outline-none text-white placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          {/* Save button */}
          <div className="p-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              SAVE (⌘+ENTER)
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default FocusedCardModal;
