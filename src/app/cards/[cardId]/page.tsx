import { getCard } from "@/actions/cardActions";
import { notFound } from "next/navigation";
import CardDetailModal from "@/components/CardDetailModal";

export default async function CardDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ cardId: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { cardId } = await params;
  const card = await getCard({ cardId });
  if (!card) {
    notFound();
  }
  return <CardDetailModal card={card} />;
}
