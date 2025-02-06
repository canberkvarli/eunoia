import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import HomePage from "@/components/HomePage";

export default async function Page() {
  const session = await getServerSession(AuthOptions);
  return <HomePage session={session} />;
}
