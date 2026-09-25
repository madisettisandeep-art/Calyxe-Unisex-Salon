"use client";

import React from "react";
import { Sparkles, Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { SALON_INFO } from "@/data/salon-data";

export const BrandStory: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: "Precision Artistry",
      desc: "Every cut and tint is sculpted to your personal facial proportions and organic hair biology.",
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Purity",
      desc: "Autoclave medical-grade sterilization, single-use client drapery, and hospital-tier hygiene.",
    },
    {
      icon: Award,
      title: "Couture Products",
      desc: "Exclusively formulated bond-builders, ammonia-free pigments, and therapeutic botanical extracts.",
    },
    {
      icon: HeartHandshake,
      title: "Personalized Care",
      desc: "Thorough one-on-one consultations in a private acoustic environment designed for total tranquility.",
    },
  ];

  return (
    <section
      id="about-section"
      className="relative py-28 sm:py-36 px-4 sm:px-8 border-t border-brand-border bg-brand-background transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Editorial Text */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.35em] uppercase text-brand-primary">
            The Calyxé Philosophy
          </span>
          <h2 className="text-4xl sm:text-6xl font-editorial font-light text-brand-text tracking-tight">
            THE CALYXÉ EXPERIENCE
          </h2>
          <p className="text-base sm:text-lg text-brand-muted font-light leading-relaxed">
            In botanical architecture, the calyx is the protective foundation from which petals emerge in perfect form. At Calyxé Unisex Salon, we craft that same foundation for your signature look.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-brand-border space-y-4 hover:border-brand-primary/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-editorial font-light text-brand-text">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
