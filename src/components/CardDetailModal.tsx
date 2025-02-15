"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { updateCard, deleteCard } from "@/actions/cardActions";
import { useRouter } from "next/navigation";

export interface Card {
  id: string;
  title?: string | null;
  body: string;
  tags: string[];
  createdAt: Date;
}

interface CardDetailModalProps {
  card: Card;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({ card }) => {
  const router = useRouter();
  const [title, setTitle] = useState(card.title || "");
  const [body, setBody] = useState(card.body);
  const [tags, setTags] = useState(card.tags.join(", "));

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this card?")) {
      router.back();
      deleteCard(card.id)
        .then(() => router.refresh())
        .catch((err) => console.error("Delete error:", err));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.back();
    updateCard(new FormData(e.currentTarget))
      .then(() => router.refresh())
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => router.back()}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[95%] h-[95%] overflow-hidden font-sans"
      >
        <button
          className="absolute top-2 right-2 z-50 p-1"
          onClick={() => router.back()}
          aria-label="Close"
        >
          <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>

        {/* Update form spanning both columns */}
        <form onSubmit={handleSubmit} className="flex h-full">
          {/* Hidden card ID */}
          <input type="hidden" name="cardId" value={card.id} />

          {/* Left column: Editable Body */}
          <div className="w-3/4 p-4 border-r border-gray-300 dark:border-gray-700">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-full p-2 border rounded-md resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Right column: Title, Tags, and Buttons */}
          <div className="w-1/4 p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter comma-separated tags"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm p-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Update Card
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Delete Card
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CardDetailModal;
