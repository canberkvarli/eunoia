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

export async function deleteCard(cardId: string) {
  const card = await prisma.card.delete({
    where: { id: cardId },
  });
  revalidatePath("/everything");
  return card;
}

export async function updateCard(formData: FormData) {
  const cardId = formData.get("cardId") as string;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const tags = formData.get("tags") as string;

  const tagsArray =
    tags && tags.trim() !== "" ? tags.split(",").map((t) => t.trim()) : [];

  const data: { title?: string; body?: string; tags?: string[] } = {};

  if (title !== undefined) data.title = title;
  if (body !== undefined) data.body = body;
  if (tags !== undefined) data.tags = tagsArray;

  const card = await prisma.card.update({
    where: { id: cardId },
    data,
  });
  revalidatePath("/everything");
  return card;
}

export async function getCard({
  cardId,
  userId,
}: {
  cardId: string;
  userId: string;
}) {
  const card = await prisma.card.findFirst({
    where: {
      id: cardId,
      userId,
    },
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
