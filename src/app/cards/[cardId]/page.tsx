import { getCard } from "@/actions/cardActions";
import { notFound } from "next/navigation";
import CardDetailModal from "@/components/CardDetailModal";

export default async function CardDetailPage({
  params,
}: {
  params: { cardId: string } | Promise<{ cardId: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { cardId } = resolvedParams;
  const card = await getCard({ cardId });
  if (!card) {
    notFound();
  }

  return <CardDetailModal card={card} />;
}
