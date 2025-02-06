import type { Metadata } from "next";
import { Geist_Mono, Newsreader } from "next/font/google";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import "@/styles/globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "100",
  variable: "--font-geist-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin-ext", "latin"],
  weight: "400",
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eunoia",
  description: "mymind's clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.className} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
