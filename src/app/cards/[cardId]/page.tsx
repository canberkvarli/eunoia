import { getCard } from "@/actions/cardActions";
import { notFound } from "next/navigation";
import CardDetailModal from "@/components/CardDetailModal";

export default async function CardDetailPage(props: {
  params: { cardId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { params } = props;
  const { cardId } = params;
  const card = await getCard({ cardId });
  if (!card) {
    notFound();
  }

  return <CardDetailModal card={card} />;
}
