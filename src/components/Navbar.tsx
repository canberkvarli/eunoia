"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navItems = [
  { label: "What", color: "#ffcc00" },
  { label: "How", color: "#ff6666" },
  { label: "Why", color: "#66ccff" },
  { label: "What's New", color: "#66ff99" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 w-full z-50 transition-all duration-500">
      {/* Main Navbar */}
      <motion.div
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-500 ${
          scrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <Logo size={100} />
        <NavLinks />
        <AuthButtons size="lg" />
      </motion.div>

      {/* Minimal Navbar (After Scroll) */}
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

/* Navigation Links */
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

/* Authentication Buttons */
const AuthButtons = ({ size }: { size: "lg" | "sm" }) => (
  <div className={`flex ${size === "lg" ? "space-x-4" : "space-x-3"}`}>
    <Link href="/login">
      <Button
        className={`shadow-none text-lg ${
          size === "lg" ? "rounded-full px-6 py-3" : "text-lg rounded-full px-3"
        }`}
      >
        Log in
      </Button>
    </Link>
    <Link href="/signup">
      <Button
        variant="default"
        className={`bg-darkOrange text-white shadow-none text-lg ${
          size === "lg"
            ? "rounded-full px-6 py-3"
            : "text-sm rounded-full px-3 hover:bg-gray-800"
        }`}
      >
        Sign up
      </Button>
    </Link>
  </div>
);
