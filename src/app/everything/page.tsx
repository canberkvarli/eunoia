import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function EverythingPage() {
  const session = await getServerSession(AuthOptions);
  return (
    <div>{session ? <p>Welcome, {session.user?.name}</p> : redirect("/")}</div>
  );
}
