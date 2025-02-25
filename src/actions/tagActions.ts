"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Create a new tag for a card.
export async function createTag(
  formData: FormData
): Promise<{ id: string; name: string }> {
  const cardId = formData.get("cardId") as string | null;
  const name = formData.get("name") as string | null;
  if (!cardId || !name) {
    throw new Error("Missing required form data");
  }
  const newTag = await prisma.tag.create({
    data: { cardId, name },
  });
  revalidatePath(`/cards/${cardId}`);
  return { id: newTag.id, name: newTag.name };
}

// Delete a tag for a card.
export async function deleteTag(tagId: string, cardId: string): Promise<void> {
  await prisma.tag.delete({
    where: { id: tagId },
  });
  revalidatePath(`/cards/${cardId}`);
}
