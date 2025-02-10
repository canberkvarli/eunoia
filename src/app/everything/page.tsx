import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MainNavBar from "@/components/MainNavBar";
import SideNavbar from "@/components/SideNavbar";
import EmptyMind from "@/components/EmptyMind";
import { ThemeProvider } from "next-themes";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { getAllCards } from "@/actions/cardActions";
import CardsContainer from "@/components/CardsContainer";
import SearchMyMind from "@/components/SearchMyMind";

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
                <div className="p-4">
                  <SearchMyMind />
                  <CardsContainer cards={cards} userId={userId} />
                </div>
              ) : (
                <EmptyMind />
              )}
            </div>
          </div>
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
