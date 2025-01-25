import type { Metadata } from "next";
import { Geist_Mono, Newsreader } from "next/font/google";
import "@/styles/globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "100",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "400",
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
        {children}
      </body>
    </html>
  );
}
