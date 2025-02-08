import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MainNavBar from "@/components/MainNavBar";
import SideNavbar from "@/components/SideNavbar";
import { ThemeProvider } from "next-themes";
import { ThemeWrapper } from "@/components/ThemeWrapper";

export default async function EverythingPage() {
  const session = await getServerSession(AuthOptions);
  if (!session) redirect("/");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
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
              <p>Welcome, {session.user?.name}</p>
            </div>
          </div>
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
