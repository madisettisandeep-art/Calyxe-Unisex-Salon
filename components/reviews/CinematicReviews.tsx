"use client";

import React, { useState, useEffect } from "react";
import { SALON_REVIEWS, SALON_INFO } from "@/data/salon-data";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export const CinematicReviews: React.FC = () => {
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIdx((prev) => (prev + 1) % SALON_REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const review = SALON_REVIEWS[currentReviewIdx];

  const prevReview = () => {
    setCurrentReviewIdx((prev) => (prev - 1 + SALON_REVIEWS.length) % SALON_REVIEWS.length);
  };

  const nextReview = () => {
    setCurrentReviewIdx((prev) => (prev + 1) % SALON_REVIEWS.length);
  };

  return (
    <section
      id="reviews-section"
      className="relative py-24 sm:py-32 px-4 sm:px-8 border-t border-brand-border bg-brand-background transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-14 relative z-10">
        {/* Section Header: Google Rating Placed Above Reviews */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-brand-border">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-brand-primary">
              <Star className="w-3.5 h-3.5 fill-brand-primary" />
              <span>Verified Client Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-brand-text">
              GOOGLE RATING & REVIEWS
            </h2>
          </div>

          {/* Prominent, Fully Visible Google Rating Badge */}
          <div className="flex items-center gap-4 glass-panel border border-brand-border px-5 py-3.5 rounded-2xl shadow-md self-start md:self-auto">
            <div className="flex items-center gap-2 text-brand-primary">
              <span className="text-3xl sm:text-4xl font-editorial font-medium text-brand-text">
                {SALON_INFO.googleRating}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 text-brand-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                  ))}
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-primary/90 mt-0.5">
                  ★ 5.0 RATING
                </span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-brand-border" />
            <div className="text-left">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-brand-primary font-semibold">
                Google Reviews
              </span>
              <span className="text-xs text-brand-muted font-light whitespace-nowrap">
                {SALON_INFO.googleReviewCount} Verified Ratings
              </span>
            </div>
          </div>
        </div>

        {/* Floating Cinematic Quote Presentation */}
        <div className="relative min-h-[220px] sm:min-h-[200px] flex items-center justify-center text-center px-4 sm:px-12">
          <Quote className="absolute -top-6 left-4 sm:left-12 w-14 h-14 text-brand-primary/10 pointer-events-none" />

          <div className="space-y-6 max-w-3xl">
            <p className="text-xl sm:text-3xl lg:text-4xl font-editorial font-light text-brand-text leading-relaxed tracking-wide italic">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="text-sm sm:text-base font-medium tracking-[0.1em] uppercase text-brand-text">
                {review.author}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span className="inline-flex items-center gap-1 text-xs text-brand-primary/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" />
                <span>Verified Google Review</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Dots & Chevrons */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <button
            onClick={prevReview}
            data-interactive
            aria-label="Previous review"
            className="p-3 rounded-full glass-pill hover:border-brand-primary text-brand-muted hover:text-brand-text transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {SALON_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReviewIdx(idx)}
                data-interactive
                aria-label={`Go to review ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentReviewIdx
                    ? "w-8 bg-brand-primary"
                    : "w-2 bg-brand-muted/30 hover:bg-brand-muted"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            data-interactive
            aria-label="Next review"
            className="p-3 rounded-full glass-pill hover:border-brand-primary text-brand-muted hover:text-brand-text transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
