"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface HomePageProps {
  session: Session | null;
}

export default function HomePage({ session }: HomePageProps) {
  return (
    <main className="relative flex flex-col items-center justify-center px-6 text-foreground">
      <SessionProvider session={session}>
        <Navbar />
      </SessionProvider>

      <div className="relative flex items-center justify-center min-h-[100vh] mt-20">
        <motion.div
          className="absolute w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-deepOrange via-softRed to-paleYellow blur-[100px] flex items-center justify-center translate-y-20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <div className="absolute w-[1000px] h-[1000px] rounded-full bg-background flex items-center justify-center translate-y-20 "></div>

        <section className="relative z-10 w-full max-w-10xl text-center py-20 px-10">
          <motion.h1
            className="text-20xl font-normal leading-tight tracking-tight md:text-[8rem] max-w-[80rem] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Remember everything. Organize nothing.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted md:text-2xl max-w-[35rem] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            All your
            {categories.map((category, index) => (
              <motion.span
                key={index}
                className="mx-1 px-3 py-1 rounded-full border text-sm font-semibold"
                style={{
                  borderColor: category.color,
                  color: category.color,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 10px ${category.color}`,
                }}
                transition={{ duration: 0.2 }}
              >
                {category.label}
              </motion.span>
            ))}
            in one single, private place.
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="px-6 py-3 text-lg font-semibold text-white bg-deepRed rounded-full shadow-md hover:bg-opacity-80 transition">
              Try it out
            </Button>
          </motion.div>
        </section>
      </div>

      <footer className="w-full py-10 text-center text-muted">
        <p>
          Made with ❤️ by
          <Link href="https://github.com/canberkvarli" className="underline">
            Canberk
          </Link>
        </p>
      </footer>
    </main>
  );
}

const categories = [
  { label: "notes", color: "#FF8B8B" },
  { label: "bookmarks", color: "#FF6666" },
  { label: "inspiration", color: "#66CCFF" },
  { label: "articles", color: "#66FF99" },
  { label: "images", color: "#A5A5A5" },
];
