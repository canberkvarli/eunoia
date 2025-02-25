"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createTag, deleteTag } from "@/actions/tagActions";

export interface TagCloudProps {
  cardId: string;
  tags?: { id: string; name: string }[];
  recentTags?: string[];
  onChange?: (newTags: { id: string; name: string }[]) => void;
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const TagCloud: React.FC<TagCloudProps> = ({
  cardId,
  tags: initialTags = [],
  recentTags = [],
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleRemoveTag = async (tagId: string) => {
    try {
      await deleteTag(tagId, cardId);
      if (onChange) {
        onChange(initialTags.filter((tag) => tag.id !== tagId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mymind-tag-cloud p-4 rounded-lg shadow-lg mt-4">
      <div className="header flex items-center justify-between mb-4">
        <label className="text-xs font-bold text-gray-700">MIND TAGS</label>
        <button
          onClick={() => setShowInput((prev) => !prev)}
          className={`px-2 py-1 rounded transition ${
            showInput ? "bg-[#FF5925] text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          {showInput ? "Cancel" : "+ Add tag"}
        </button>
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.form
            action={createTag}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <input type="hidden" name="cardId" value={cardId} />
            <div className="flex items-center space-x-2">
              <input
                className="input border rounded p-2 w-full"
                autoComplete="off"
                name="name"
                maxLength={100}
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter tag name"
              />
              <button
                type="submit"
                className="p-2 bg-[#FF5925] text-white rounded"
              >
                <div className="text-md px-1">+</div>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {recentTags.length > 0 && (
        <div className="mymind-recent-tag-block mb-4">
          <label className="text-xs text-gray-500">Last used:</label>
          <ul className="recent-tags flex space-x-2 mt-1">
            {recentTags.map((tag) => (
              <li
                key={tag}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="guts expanded flex flex-wrap gap-2">
        <AnimatePresence>
          {initialTags.map((tag) => (
            <motion.div
              key={tag.id}
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="relative mymind-tag manual flex items-center bg-blue-100 px-2 py-1 rounded group"
            >
              <span className="value">{`#${tag.name}`}</span>
              <motion.div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
                <X
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => handleRemoveTag(tag.id)}
                  style={{ color: "#FF5925" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="cut-off"></div>
      </div>
    </div>
  );
};

export default TagCloud;
