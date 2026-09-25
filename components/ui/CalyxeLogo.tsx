"use client";

import React from "react";

interface CalyxeLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showSubline?: boolean;
  inverted?: boolean;
}

export const CalyxeLogo: React.FC<CalyxeLogoProps> = ({
  className = "",
  size = "md",
  showSubline = true,
  inverted = false,
}) => {

  // Scaled dimensions
  const scaleMap = {
    sm: { height: 26, fontSize: "text-lg", subSize: "text-[7px]", markSize: 18 },
    md: { height: 36, fontSize: "text-2xl", subSize: "text-[9px]", markSize: 24 },
    lg: { height: 48, fontSize: "text-4xl", subSize: "text-[11px]", markSize: 32 },
    xl: { height: 64, fontSize: "text-5xl", subSize: "text-[13px]", markSize: 42 },
  };

  const currentScale = scaleMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>

      {/* Haute Couture Bespoke Vector Brandmark */}
      <div className="flex items-center gap-3">
        {/* Geometric Botanical Calyx Emblem */}
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{ width: currentScale.markSize, height: currentScale.markSize }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-brand-primary drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] transition-transform duration-500 hover:rotate-45"
          >
            {/* Outer Diamond Harmony */}
            <rect
              x="50"
              y="6"
              width="62"
              height="62"
              rx="12"
              transform="rotate(45 50 6)"
              stroke="currentColor"
              strokeWidth="2.5"
              className="opacity-70"
            />
            {/* Inner Calyx Petal Arcs */}
            <path
              d="M50 16 C 65 35, 75 55, 50 84 C 25 55, 35 35, 50 16 Z"
              stroke="currentColor"
              strokeWidth="3.5"
              fill="currentColor"
              fillOpacity="0.18"
            />
            {/* Central Precision Core */}
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col">
          <div className="flex items-baseline tracking-[0.22em] font-editorial font-light leading-none">
            <span
              className={`font-semibold transition-colors duration-300 ${
                inverted ? "text-white" : "text-brand-text"
              } ${currentScale.fontSize}`}
            >
              CALYX
            </span>
            <span className={`text-brand-primary font-serif ${currentScale.fontSize}`}>
              É
            </span>
          </div>

          {showSubline && (
            <span
              className={`font-sans font-medium uppercase tracking-[0.42em] mt-1 transition-colors duration-300 ${
                inverted ? "text-neutral-400" : "text-brand-muted"
              } ${currentScale.subSize}`}
            >
              Unisex Salon
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
