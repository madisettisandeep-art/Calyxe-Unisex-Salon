import React from "react";

// 5. Loading Skeletons with luxury gold/porcelain shimmer
export const TransformationSliderSkeleton: React.FC = () => (
  <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-brand-border bg-brand-background">
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="space-y-3">
        <div className="w-36 h-4 bg-brand-border/40 rounded-full animate-pulse" />
        <div className="w-72 h-10 bg-brand-border/30 rounded-lg animate-pulse" />
      </div>
      <div className="w-full max-w-5xl mx-auto aspect-[16/10] rounded-2xl glass-panel border border-brand-border animate-pulse bg-brand-surface/40 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-brand-primary/30 border-t-brand-primary animate-spin" />
      </div>
    </div>
  </section>
);

export const ReviewsSkeleton: React.FC = () => (
  <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-brand-border bg-brand-background">
    <div className="max-w-6xl mx-auto space-y-10 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="w-48 h-8 bg-brand-border/40 rounded-lg" />
        <div className="w-32 h-10 bg-brand-border/30 rounded-xl" />
      </div>
      <div className="w-full h-36 rounded-2xl glass-panel bg-brand-surface/40 flex items-center justify-center" />
    </div>
  </section>
);

export const BookingDeskSkeleton: React.FC = () => (
  <section className="py-28 sm:py-36 px-4 sm:px-8 border-t border-brand-border bg-brand-background">
    <div className="max-w-4xl mx-auto space-y-10 animate-pulse">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-40 h-4 bg-brand-border/40 rounded-full" />
        <div className="w-64 h-10 bg-brand-border/30 rounded-lg" />
      </div>
      <div className="w-full h-96 rounded-3xl glass-panel bg-brand-surface/40" />
    </div>
  </section>
);
