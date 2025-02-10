"use client";

import { useState, useRef } from "react";
import { createCard } from "@/actions/cardActions";

const NewCard = ({ userId }: { userId: string }) => {
  const [content, setContent] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Listen for Cmd/Ctrl+Enter to trigger form submission.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      action={createCard}
      className="relative bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-xl mx-auto font-sans"
    >
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="title" value="New Note" />
      <input type="hidden" name="tags" value="" />

      <div className="mt-4 relative">
        <textarea
          name="body"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start typing here…"
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-4 min-h-[150px] focus:outline-none"
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition"
        >
          PRESS ⌘+ENTER TO SAVE
        </button>
      </div>
    </form>
  );
};

export default NewCard;
