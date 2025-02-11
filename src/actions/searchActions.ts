"use server";

import { prisma } from "@/lib/prisma";

export async function searchCards(userId: string, query: string) {
  const cards = await prisma.card.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { body: { contains: query, mode: "insensitive" } },
        { tags: { has: query } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return cards;
}
