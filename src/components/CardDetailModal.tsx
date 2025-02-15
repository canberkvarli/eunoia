"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { updateCard, deleteCard } from "@/actions/cardActions";
import { useRouter } from "next/navigation";

export interface Card {
  id: string;
  title?: string | null;
  body: string;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
}

interface CardDetailModalProps {
  card: Card;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const seconds = diff / 1000;
  if (Math.abs(seconds) < 60) return rtf.format(Math.round(seconds), "second");
  const minutes = seconds / 60;
  if (Math.abs(minutes) < 60) return rtf.format(Math.round(minutes), "minute");
  const hours = minutes / 60;
  if (Math.abs(hours) < 24) return rtf.format(Math.round(hours), "hour");
  const days = hours / 24;
  return rtf.format(Math.round(days), "day");
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({ card }) => {
  const router = useRouter();
  const [title, setTitle] = useState(card.title || "");
  const [body, setBody] = useState(card.body);
  const [tags, setTags] = useState(card.tags.join(", "));
  const [isDeleting, setIsDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  };

  useEffect(() => {
    textareaRef.current?.focus();
    autoResize();
  }, []);

  useEffect(() => {
    const saveChanges = async () => {
      try {
        const formData = new FormData();
        formData.set("cardId", card.id);
        formData.set("title", title);
        formData.set("body", body);
        formData.set("tags", tags);
        await updateCard(formData);
        router.refresh();
      } catch (err) {
        console.error("Autosave error:", err);
      }
    };
    saveChanges();
    autoResize();
  }, [title, body, tags]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCard(card.id);
      router.refresh();
      router.back();
    } catch (err) {
      console.error("Delete error:", err);
      setIsDeleting(false);
    }
  };

  const updatedDate = card.updatedAt
    ? new Date(card.updatedAt)
    : new Date(card.createdAt);
  const relativeTime = getRelativeTime(updatedDate);
  const formattedTime = updatedDate.toLocaleString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop: clicking outside closes the modal */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => {
          if (!isDeleting) router.back();
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-[#0A0C0F] rounded-lg shadow-lg w-[95%] h-[95%] overflow-hidden font-sans"
      >
        <div className="flex h-full">
          <div className="w-3/4 p-4 flex items-center justify-center">
            <textarea
              ref={textareaRef}
              name="body"
              value={body}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBody(e.target.value)
              }
              placeholder="Start writing..."
              autoFocus
              className="w-full bg-transparent focus:outline-none resize-none text-left text-xl dark:text-[#A6B4C6] pl-5"
              style={{ overflow: "hidden" }}
            />
          </div>
          <div className="w-1/4 bg-[#F0F2F5] dark:bg-[#505154] p-4 rounded-lg flex flex-col justify-between">
            <header>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title goes here"
                maxLength={100}
                className="w-full bg-transparent focus:outline-none text-3xl dark:text-[#A6B4C6]"
              />
              <div className="line mt-1 text-sm text-gray-600 dark:text-[#A6B4C6] relative group">
                <time dateTime={updatedDate.toISOString()}>{relativeTime}</time>
                <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded mt-1">
                  {formattedTime}
                </span>
              </div>
            </header>
            <div className="mt-4">
              <input
                type="text"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags, separated by commas"
                className="w-full bg-transparent focus:outline-none text-sm dark:text-[#A6B4C6]"
              />
            </div>
            <div className="flex justify-center mt-8">
              <div className="relative group">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full transition transform hover:scale-110 hover:bg-red-500"
                  aria-label="Delete card"
                >
                  <Trash2 className="h-6 w-6 text-gray-700 dark:text-[#A6B4C6]" />
                </button>
                <span className="absolute w-20 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition pl-2">
                  Delete card
                </span>
              </div>
            </div>
          </div>
        </div>
        {isDeleting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
            <p className="mt-4 text-white text-xl">Deleting...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CardDetailModal;
