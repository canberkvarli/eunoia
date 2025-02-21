import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MainNavBar from "@/components/MainNavBar";
import SideNavbar from "@/components/SideNavbar";
import EmptyMind from "@/components/EmptyMind";
import { ThemeProvider } from "next-themes";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { getAllCards } from "@/actions/cardActions";
import MyMind from "@/components/MyMind";

export default async function EverythingPage() {
  const session = await getServerSession(AuthOptions);
  if (!session) {
    redirect("/");
  }
  const userId = (session?.user as { id: string }).id;
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
