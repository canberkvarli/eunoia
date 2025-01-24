"use client";

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
  return (
    <header className="fixed top-0 left-0 w-full text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo & Name */}
        <div className="flex items-center space-x-2">
          <Image
            src="/eunoia-logo.svg"
            alt="Eunoia Logo"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Center: Navigation (ShadCN Navigation Menu) */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-8">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <motion.div
                  className="relative flex items-center space-x-2 text-lg font-medium cursor-pointer"
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

        {/* Right: Auth Buttons (ShadCN UI) */}
        <div className="flex space-x-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="border border-black rounded-full"
            >
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="default"
              className="bg-black text-white rounded-full hover:bg-gray-800"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
