"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import type { ClientSafeProvider } from "next-auth/react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "What", color: "#ffcc00" },
  { label: "How", color: "#ff6666" },
  { label: "Why", color: "#66ccff" },
  { label: "What's New", color: "#66ff99" },
];

export default function Navbar({}: Record<string, ClientSafeProvider>) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 w-full z-50 transition-all duration-500">
      <motion.div
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-500 ${
          scrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <Logo size={100} />
        <NavLinks />
        <AuthButtons size="lg" />
      </motion.div>

      <motion.div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[900px] h-[60px] bg-white shadow-lg rounded-full flex items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Logo size={80} />
        <NavLinks small />
        <AuthButtons size="sm" />
      </motion.div>
    </header>
  );
}

const Logo = ({ size }: { size: number }) => (
  <Image
    src="eunoia-logo.svg"
    alt="Eunoia Logo"
    width={size}
    height={size}
    priority
  />
);

const NavLinks = ({ small = false }: { small?: boolean }) => (
  <NavigationMenu>
    <NavigationMenuList className={`flex ${small ? "space-x-6" : "space-x-8"}`}>
      {navItems.map((item, index) => (
        <NavigationMenuItem key={index}>
          <motion.div
            className="relative flex items-center space-x-1 text-xl font-medium cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => console.log(`${item.label} clicked`)}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
              whileHover={{
                scale: 1.5,
                boxShadow: `0 0 10px ${item.color}`,
              }}
            />
            <NavigationMenuLink>{item.label}</NavigationMenuLink>
          </motion.div>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const AuthButtons = ({ size }: { size: "lg" | "sm" }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAuthPage = pathname === "/entering-my-mind";
  const mode = searchParams.get("mode") || "login";

  if (session) {
    return (
      <Button
        onClick={() => signOut()}
        className={`shadow-none text-lg ${
          size === "lg" ? "rounded-full px-6 py-3" : "text-lg rounded-full px-3"
        }`}
      >
        Log out
      </Button>
    );
  }

  if (isAuthPage) {
    return (
      <div>
        {mode === "login" ? (
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
        )}
      </div>
    );
  }

  return (
    <div className={`flex ${size === "lg" ? "space-x-4" : "space-x-3"}`}>
      <Link
        href="/entering-my-mind?mode=login"
        className={`shadow-none text-lg ${
          size === "lg" ? "rounded-full px-6 py-3" : "text-lg rounded-full px-3"
        }`}
      >
        Log in
      </Link>
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
    </div>
  );
};
