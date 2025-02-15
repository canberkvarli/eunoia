import { getCard } from "@/actions/cardActions";
import { notFound } from "next/navigation";
import CardDetailModal from "@/components/CardDetailModal";

interface PageProps {
  params: { cardId: string; userId: string };
}

export default async function CardDetailPage({ params }: PageProps) {
  const userId = params.userId;
  const card = await getCard({ cardId: params.cardId, userId });
  if (!card) {
    notFound();
  }

  return <CardDetailModal card={card} />;
}
