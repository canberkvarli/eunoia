"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative min-h-screen">
        <Navbar />

        <div className="absolute inset-0 -z-10">
          <Image
            src="/background2.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
          <motion.h1
            className="text-9xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Oops!
          </motion.h1>
          <motion.p
            className="text-2xl text-white mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            The page you are looking for doesn’t exist.
            <br />
            It seems your mind wandered off – but don’t worry, you can always
            return home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/"
              className="px-6 py-3 bg-darkOrange text-white rounded-full shadow hover:bg-orange-600 transition"
            >
              Return to Homepage
            </Link>
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}
