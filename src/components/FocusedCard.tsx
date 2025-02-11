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
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#424751] to-[#0A0C0F] dark:bg-gradient-to-b dark:from-[#062E45] dark:via-[#702736] dark:to-[#562F2F]"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <form
          ref={formRef}
          action={createCard}
          className="relative w-full h-full flex flex-col bg-transparent"
        >
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="tags" value="" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white"
            aria-label="Close modal"
          >
            <ArrowDownRight className="w-8 h-8 rotate-90" />
          </button>

          <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center">
            <div className="px-4 mb-4">
              <input
                ref={titleRef}
                type="text"
                name="title"
                placeholder="Type your headline here."
                className="w-full text-[4rem] bg-transparent focus:outline-none text-left text-white/70 placeholder:text-white/70 dark:placeholder:text-white/70 dark:text-white/70 px-4"
              />
            </div>

            <div className="px-4">
              <textarea
                name="body"
                placeholder="Start writing right here..."
                className="w-full h-80 bg-transparent text-xl focus:outline-none text-left placeholder:text-white/70 dark:placeholder:text-white/70 text-white/70 dark:text-[#A5B4C6] resize-none px-4"
              ></textarea>
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <button
              type="submit"
              className="px-6 py-2 text-white rounded-3xl bg-gray-500 hover:bg-gray-600 transition"
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
