// src/app/cards/[cardId]/page.tsx
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCard } from "@/actions/cardActions";
import CardDetailModal from "@/components/CardDetailModal";

interface PageProps {
  params: { cardId: string };
}

export default async function CardDetailPage({ params }: PageProps) {
  const session = await getServerSession(AuthOptions);
  if (!session) {
    redirect("/");
  }
  const userId = (session.user as { id: string }).id;
  const card = await getCard({ cardId: params.cardId, userId });
  if (!card) {
    notFound();
  }

  return <CardDetailModal card={card} />;
}
