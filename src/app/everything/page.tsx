import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MainNavBar from "@/components/MainNavBar";
import SideNavbar from "@/components/SideNavbar";
import EmptyMind from "@/components/EmptyMind";
import { ThemeProvider } from "next-themes";
import { ThemeWrapper } from "@/components/ThemeWrapper";

export default async function EverythingPage() {
  const session = await getServerSession(AuthOptions);
  if (!session) redirect("/");

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
              {/* Must render conditionnally if user has no cards else render the cards with the search bar*/}
              <EmptyMind />
            </div>
          </div>
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
