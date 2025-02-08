import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import HomePage from "@/components/HomePage";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(AuthOptions);
  if (session) {
    redirect("/everything");
  }
  return <HomePage session={session} />;
}
