"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bgColor = theme === "dark" ? "#14161E" : "#F0F2F5";

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen"
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
}
