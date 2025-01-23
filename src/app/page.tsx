"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#f7f5f2] text-[#2d2d2d]">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center py-20">
        <motion.h1
          className="text-5xl font-bold leading-tight tracking-tight md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Remember everything. Organize nothing.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-gray-600 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Your second brain for ideas, images, inspiration, and notes. Let AI
          organize them for you.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/signup">
            <button className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-md hover:bg-gray-900 transition">
              Try it free
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={64}
              height={64}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full py-10 text-center text-gray-500">
        <p>
          Made with ❤️ by{" "}
          <Link href="https://github.com/canberkvarli" className="underline">
            Canberk
          </Link>
        </p>
      </footer>
    </main>
  );
}

const features = [
  {
    title: "Your Digital Brain",
    description: "Save ideas, links, images, and notes effortlessly.",
    image: "/file.svg",
  },
  {
    title: "Organized by AI",
    description: "AI auto-categorizes everything so you don't have to.",
    image: "/globe.svg",
  },
  {
    title: "Instantly Searchable",
    description: "Find anything in seconds with powerful search.",
    image: "/window.svg",
  },
];
