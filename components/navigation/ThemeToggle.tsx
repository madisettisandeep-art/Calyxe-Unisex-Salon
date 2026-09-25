"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("calyxe-theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("calyxe-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("calyxe-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-brand-surface border border-brand-border" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      data-interactive
      aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
      className="relative flex items-center justify-between w-16 h-7 px-1.5 rounded-full glass-pill border border-brand-border hover:border-brand-primary/60 transition-all duration-300"
    >
      <Sun className={`w-3.5 h-3.5 z-10 transition-colors duration-300 ${!isDark ? "text-amber-500" : "text-brand-muted"}`} />
      <Moon className={`w-3.5 h-3.5 z-10 transition-colors duration-300 ${isDark ? "text-brand-primary" : "text-brand-muted"}`} />

      {/* Tactile Gliding Pill */}
      <span
        className={`absolute top-0.5 bottom-0.5 w-6 rounded-full bg-brand-primary/25 border border-brand-primary/40 backdrop-blur-sm transition-transform duration-300 ease-out ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </button>
  );
};
