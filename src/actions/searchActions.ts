"use server";

import { prisma } from "@/lib/prisma";

/**
 * Search for cards by matching the query against title, body, tags,
 * and, if possible, the createdAt timestamp (within a ±1-day range).
 *
 * @param userId - The current user's ID.
 * @param query - The search query input.
 * @returns A list of matching cards.
 */
export async function searchCards(userId: string, query: string) {
  // Try to parse the query as a date.
  let dateQuery = null;
  if (!isNaN(Date.parse(query))) {
    dateQuery = new Date(query);
  }

  const cards = await prisma.card.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { body: { contains: query, mode: "insensitive" } },
        { tags: { has: query } },
        // If query can be parsed as a date, include cards whose
        // createdAt is within one day (86400000 milliseconds) of that date.
        ...(dateQuery
          ? [
              {
                createdAt: {
                  gte: new Date(dateQuery.getTime() - 86400000),
                  lte: new Date(dateQuery.getTime() + 86400000),
                },
              },
            ]
          : []),
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return cards;
}
