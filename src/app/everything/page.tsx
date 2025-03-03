import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import MainNavBar from "@/components/MainNavBar";
import SideNavbar from "@/components/SideNavbar";
import EmptyMind from "@/components/EmptyMind";
import { ThemeProvider } from "next-themes";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { getAllCards } from "@/actions/cardActions";
import MyMind from "@/components/MyMind";
import { prisma } from "@/lib/prisma";
import type { DefaultSession } from "next-auth";

interface DemoSession extends DefaultSession {
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

export default async function EverythingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<JSX.Element> {
  const resolvedSearchParams = await searchParams;

  let session = await getServerSession(authOptions);

  if (!session && resolvedSearchParams.demo === "true") {
    const demoUser = await prisma.user.findUnique({
      where: { email: "demo@example.com" },
    });
    if (demoUser) {
      session = {
        user: {
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
        },
      } as DemoSession;
    }
  }

  if (!session) {
    redirect("/");
  }

  const userId = (session.user as { id: string }).id;
  const cards = await getAllCards(userId);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      enableColorScheme={false}
    >
      <ThemeWrapper>
        <div className="flex">
          <SideNavbar />
          <div className="flex-1">
            <MainNavBar />
            <div className="p-4">
              {cards && cards.length > 0 ? (
                <MyMind userId={userId} initialCards={cards} />
              ) : (
                <EmptyMind userId={userId} />
              )}
            </div>
          </div>
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
