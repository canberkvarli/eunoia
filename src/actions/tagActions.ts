"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Create a new tag for a card.
export async function createTag(formData: FormData): Promise<void> {
  const cardId = formData.get("cardId") as string | null;
  const name = formData.get("name") as string | null;
  if (!cardId || !name) {
    throw new Error("Missing required form data");
  }
  await prisma.tag.create({
    data: { cardId, name },
  });
  revalidatePath(`/cards/${cardId}`);
}

// Delete a tag for a card.
export async function deleteTag(tagId: string, cardId: string) {
  await prisma.tag.delete({
    where: { id: tagId },
  });
  revalidatePath(`/cards/${cardId}`);
}

// Get all tags for a given card.
export async function getAllTags(cardId: string) {
  const tags = await prisma.tag.findMany({
    where: { cardId },
    orderBy: { createdAt: "asc" },
  });
  return tags;
}
