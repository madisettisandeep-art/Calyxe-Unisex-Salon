"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { TRANSFORMATION_ITEMS, TransformationItem } from "@/data/salon-data";
import { Sparkles, MoveHorizontal, Clock } from "lucide-react";

export const TransformationSlider: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = TRANSFORMATION_ITEMS[selectedIdx] || TRANSFORMATION_ITEMS[0];

  const isTicking = useRef(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (isTicking.current) return;
      isTicking.current = true;

      requestAnimationFrame(() => {
        isTicking.current = false;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
      });
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section
      id="transformations-section"
      className="relative py-24 sm:py-32 px-4 sm:px-8 border-t border-brand-border bg-brand-background transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-brand-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-brand-text">
              BEFORE & BEYOND
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-brand-muted font-light leading-relaxed">
            Drag the comparison bar horizontally to witness the precision cut, dimensional color, and structural finish.
          </p>
        </div>

        {/* Transformation Item Switcher */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {TRANSFORMATION_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIdx(idx);
                setSliderPosition(50);
              }}
              data-interactive
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
                idx === selectedIdx
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                  : "text-brand-muted hover:text-brand-text glass-pill"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Draggable Split Comparison Box */}
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl glass-panel border border-brand-border shadow-2xl">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden select-none cursor-ew-resize touch-none"
          >
            {/* After Image (Background layer) */}
            <div className="absolute inset-0">
              <Image
                src={currentItem.afterImage}
                alt={`${currentItem.title} After`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-brand-surface/90 backdrop-blur-md text-brand-primary border border-brand-primary/40 shadow-md">
                AFTER
              </div>
            </div>

            {/* Before Image (Revealed Layer clipped by sliderPosition) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || "100%" }}>
                <Image
                  src={currentItem.beforeImage}
                  alt={`${currentItem.title} Before`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-brand-surface/90 backdrop-blur-md text-brand-muted border border-brand-border shadow-md">
                  BEFORE
                </div>
              </div>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-brand-primary shadow-[0_0_15px_rgba(184,134,11,0.5)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-xl border-2 border-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Bottom Transformation Info */}
          <div className="p-6 sm:p-8 bg-brand-surface/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-brand-border">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-brand-primary">
                {currentItem.category} • {currentItem.timeTaken}
              </span>
              <h3 className="text-xl sm:text-2xl font-editorial font-light text-brand-text">
                {currentItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted font-light max-w-xl">
                {currentItem.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-brand-muted font-mono shrink-0">
              <Clock className="w-4 h-4 text-brand-primary" />
              <span>{currentItem.timeTaken} Execution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
