"use client";

import { useState, useRef } from "react";
import { createCard } from "@/actions/cardActions";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderPinwheel } from "lucide-react";

const NewCard = ({ userId }: { userId: string }) => {
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);
  const [hideLabel, setHideLabel] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleCardClick = () => {
    textareaRef.current?.focus();
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setHideLabel(scrollTop > 0);
  };

  return (
    <form
      ref={formRef}
      action={createCard}
      onSubmit={() => setContent("")}
      className="rounded-lg w-full max-w-xl mx-auto font-sans transition-all duration-300"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="title" value="New Note" />
      <input type="hidden" name="tags" value="" />

      {focused && (
        <motion.div
          initial={{ opacity: 0, backgroundSize: "150%" }}
          animate={{ opacity: 1, backgroundSize: "100%" }}
          exit={{ opacity: 0, backgroundSize: "150%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed inset-0 z-10"
          style={{
            background:
              "radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />
      )}

      <div className="relative z-20" onClick={handleCardClick}>
        <div className="rounded-lg transition-colors duration-300 bg-lightCard dark:bg-darkCard">
          <div className="pb-2 overflow-auto">
            <textarea
              ref={textareaRef}
              name="body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              className="w-full px-4 pb-10 rounded focus:outline-none resize-none bg-[##FFFFFF] dark:bg-[#1D1F28] text-black dark:text-[#A6B4C6] pt-12 relative z-0"
              style={{ minHeight: "200px" }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        </div>

        {!hideLabel && (
          <div className="absolute top-2 left-6 pointer-events-none z-30">
            <span className="text-sm" style={{ color: "#FF5925" }}>
              ADD A NEW NOTE
            </span>
          </div>
        )}

        {/*  button overlay */}
        <AnimatePresence>
          {content.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 bottom-2 px-2 pb-2"
            >
              <button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                className="w-full py-1 rounded text-sm font-bold transition"
                style={{ backgroundColor: "#FF5925", color: "#fff" }}
              >
                PRESS ⌘+ENTER TO SAVE
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-2 right-2 z-30">
          <div className="group relative inline-block">
            <LoaderPinwheel className="h-6 w-6 text-orange-500 hover:animate-spin hover:opacity-90 cursor-pointer" />
            <span className="absolute -bottom-full bottom-6 right-0 hidden group-hover:block bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs px-2 py-1 rounded">
              Focus CMD+F
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewCard;
