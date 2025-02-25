import { getCard } from "@/actions/cardActions";
import { notFound } from "next/navigation";
import CardDetailModal from "@/components/CardDetailModal";

interface CardDetailPageProps {
  params: Promise<{ cardId: string }>;
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { cardId } = await params;
  const card = await getCard({ cardId });
  if (!card) {
    notFound();
  }

  return <CardDetailModal card={card} />;
}
