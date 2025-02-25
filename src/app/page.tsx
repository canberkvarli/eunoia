import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import HomePage from "@/components/HomePage";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/everything");
  }
  return <HomePage session={session} />;
}
