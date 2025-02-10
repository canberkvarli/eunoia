"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "What", color: "#ffcc00" },
  { label: "How", color: "#ff6666" },
  { label: "Why", color: "#66ccff" },
  { label: "What's New", color: "#66ff99" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="fixed top-5 left-0 w-full z-50 transition-all duration-500">
      <motion.div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-500">
        <Logo size={100} />
        <NavLinks />
        <AuthButtons
          size="lg"
          session={session}
          pathname={pathname}
          searchParams={searchParams}
        />
      </motion.div>
    </header>
  );
}

const Logo = ({ size }: { size: number }) => (
  <Image
    src="/eunoia-logo.svg"
    alt="Eunoia Logo"
    width={size}
    height={size}
    priority
  />
);

const NavLinks = () => (
  <nav>
    <ul className="flex space-x-8">
      {navItems.map((item, index) => (
        <li key={index}>
          <motion.div
            className="flex items-center space-x-1 text-xl font-medium cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
              whileHover={{ scale: 1.5, boxShadow: `0 0 10px ${item.color}` }}
            />
            <Link href="#">{item.label}</Link>
          </motion.div>
        </li>
      ))}
    </ul>
  </nav>
);

interface AuthButtonsProps {
  size: "lg" | "sm";
  session: unknown;
  pathname: string;
  searchParams: URLSearchParams;
}

const AuthButtons = ({
  size,
  session,
  pathname,
  searchParams,
}: AuthButtonsProps) => {
  if (session) {
    return (
      <Link
        href="/everything"
        className={`bg-darkOrange text-white shadow-none text-lg ${
          size === "lg"
            ? "rounded-full px-6 py-3"
            : "text-sm rounded-full px-3 hover:bg-gray-800"
        }`}
      >
        My Mind
      </Link>
    );
  } else {
    if (pathname === "/entering-my-mind") {
      return searchParams.get("mode") === "login" ? (
        <Link
          href="/entering-my-mind?mode=signup"
          className={`bg-darkOrange text-white shadow-none text-lg ${
            size === "lg"
              ? "rounded-full px-6 py-3"
              : "text-sm rounded-full px-3 hover:bg-gray-800"
          }`}
        >
          Sign up
        </Link>
      ) : (
        <Link
          href="/entering-my-mind?mode=login"
          className={`shadow-none text-lg ${
            size === "lg"
              ? "rounded-full px-6 py-3"
              : "text-lg rounded-full px-3"
          }`}
        >
          Log in
        </Link>
      );
    } else {
      return (
        <div className={`flex ${size === "lg" ? "space-x-4" : "space-x-3"}`}>
          <Link
            href="/entering-my-mind?mode=login"
            className={`shadow-none text-lg ${
              size === "lg"
                ? "rounded-full px-6 py-3"
                : "text-lg rounded-full px-3"
            }`}
          >
            Log in
          </Link>
          <Link
            href="/entering-my-mind?mode=signup"
            className={`bg-darkOrange text-white shadow-none text-lg ${
              size === "lg"
                ? "rounded-full px-6 py-3"
                : "text-md rounded-full px-3 hover:bg-gray-800"
            }`}
          >
            Sign up
          </Link>
        </div>
      );
    }
  }
};
