export const runtime = "nodejs";
export const revalidate = 0; // or dynamic = "force-dynamic"

import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
