"use client";

import { useState, useRef } from "react";
import { createCard } from "@/actions/cardActions";
import { motion, AnimatePresence } from "framer-motion";

const NewCard = ({ userId }: { userId: string }) => {
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      action={createCard} // server action invoked on submission
      className="rounded-lg shadow w-full max-w-xl mx-auto font-sans transition-all duration-300"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="title" value="New Note" />
      <input type="hidden" name="tags" value="" />

      <div
        className={`rounded-lg transition-colors duration-300
          ${"bg-lightCard"} dark:bg-darkCard`}
        style={{
          backgroundColor: focused ? undefined : undefined,
        }}
      >
        {/* Header / Label */}
        <div className="px-2 pt-2">
          <span className="text-sm" style={{ color: "#FF5925" }}>
            ADD A NEW NOTE
          </span>
        </div>

        {/* Editor area */}
        <div className="px-2 pb-2">
          <textarea
            name="body"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start typing here…"
            className="w-full rounded focus:outline-none resize-none 
              bg-[##FFFFFF] dark:bg-[#1D1F28] text-black dark:text-[#A6B4C6]"
            style={{ minHeight: "200px" }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        <AnimatePresence>
          {content.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="px-2 pb-2"
            >
              <button
                type="submit"
                className="w-full py-2 rounded text-sm font-bold transition"
                style={{ backgroundColor: "#FF5925", color: "#fff" }}
              >
                PRESS ⌘+ENTER TO SAVE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default NewCard;
