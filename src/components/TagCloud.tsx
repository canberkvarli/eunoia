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
  const [tags, setTags] = useState<{ id: string; name: string }[]>(initialTags);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleCreateTag = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || tags.some((tag) => tag.name === trimmed)) return;
    try {
      const formData = new FormData();
      formData.set("cardId", cardId);
      formData.set("name", trimmed);
      const newTag = await createTag(formData);
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      if (onChange) onChange(updatedTags);
      setInputValue("");
      setShowInput(false);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateTag();
  };

  const handleRemoveTag = async (tagId: string) => {
    try {
      await deleteTag(tagId, cardId);
      const updatedTags = tags.filter((tag) => tag.id !== tagId);
      setTags(updatedTags);
      if (onChange) onChange(updatedTags);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg mt-4">
      <div className="header flex items-center justify-between mb-4">
        <label className="text-xs font-bold text-gray-700 dark:text-[#A6B4C6]">
          MIND TAGS
        </label>
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <input type="hidden" name="cardId" value={cardId} />
            <div className="flex items-center">
              <input
                className="input rounded p-2 w-full dark:bg-[#242631] dark:text-[#A6B4C6]"
                autoComplete="off"
                name="name"
                maxLength={100}
                autoFocus
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter tag name"
              />
              <button
                type="submit"
                className="p-2 w-[3rem] bg-[#FF5925] text-white rounded text-2xl"
              >
                +
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
          <button
            onClick={() => setShowInput((prev) => !prev)}
            className={
              "px-2 py-1 rounded-2xl transition bg-[#FF5925] text-white"
            }
          >
            + Add Tag
          </button>
          {tags.map((tag) => (
            <motion.div
              key={tag.id}
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="relative mymind-tag manual flex items-center bg-blue-100 px-2 py-1 rounded group rounded-2xl dark:bg-[#A6B4C6]"
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
