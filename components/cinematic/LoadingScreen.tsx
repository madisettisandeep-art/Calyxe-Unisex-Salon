"use client";

import React, { useState, useEffect } from "react";
import { CalyxeLogo } from "../ui/CalyxeLogo";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Eagerly pre-cache first walkthrough scene
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = "/walkthrough/scene_01_entrance.jpg";
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setIsDone(true);
              if (onComplete) onComplete();
            }, 300);
          }, 80);
          return 100;
        }
        const increment = Math.floor(Math.random() * 25) + 18;
        return Math.min(100, prev + increment);
      });
    }, 18);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-brand-background text-brand-text transition-opacity duration-300 ease-out select-none ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center max-w-sm">
        {/* Animated Calyxé Logo */}
        <div className="relative">
          <CalyxeLogo size="lg" />
          <div className="absolute -inset-4 rounded-full border border-brand-primary/20 animate-ping opacity-25" />
        </div>

        {/* Cinematic Step Text */}
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.4em] uppercase text-brand-primary font-semibold">
            Initializing Journey
          </p>
          <h2 className="text-xl font-editorial font-light tracking-[0.15em] text-brand-text">
            STEP INTO CALYXÉ
          </h2>
          <p className="text-[11px] text-brand-muted tracking-wider">
            Hanamkonda, Telangana
          </p>
        </div>

        {/* Counter & Minimalist Bar */}
        <div className="w-48 mt-4 flex flex-col items-center gap-2">
          <div className="w-full h-[2.5px] bg-brand-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-primary via-amber-400 to-brand-primary transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] tracking-[0.25em] font-mono text-brand-muted">
            {progress.toString().padStart(3, "0")} %
          </span>
        </div>
      </div>
    </div>
  );
};
