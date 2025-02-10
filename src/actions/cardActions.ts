"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCard(formData: FormData): Promise<void> {
  const userId = formData.get("userId") as string | null;
  const title = formData.get("title") as string | null;
  const body = formData.get("body") as string | null;
  const tags = formData.get("tags") as string | null;

  if (!userId || !body) {
    throw new Error("Missing required form data");
  }

  const tagsArray =
    tags && tags.trim() !== "" ? tags.split(",").map((t) => t.trim()) : [];

  await prisma.card.create({
    data: {
      userId,
      title: title ?? "",
      body,
      tags: tagsArray,
    },
  });

  revalidatePath("/everything");
}

// Delete a card by its ID
export async function deleteCard(cardId: string) {
  const card = await prisma.card.delete({
    where: { id: cardId },
  });
  return card;
}

// Update a card by its ID
export async function updateCard(
  cardId: string,
  data: { title?: string; body?: string; tags?: string[] }
) {
  const card = await prisma.card.update({
    where: { id: cardId },
    data,
  });
  return card;
}

// Get a single card by its ID (if needed)
export async function getCard(cardId: string) {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
  });
  return card;
}

// Get all cards for a given user
export async function getAllCards(userId: string) {
  const cards = await prisma.card.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
  return cards;
}
