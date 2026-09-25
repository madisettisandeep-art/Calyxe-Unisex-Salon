"use client";

import React from "react";
import { CalyxeLogo } from "./CalyxeLogo";
import { Calendar, MessageSquare } from "lucide-react";
import { SALON_INFO } from "@/data/salon-data";

interface FinalEndingProps {
  onOpenBooking: () => void;
}

export const FinalEnding: React.FC<FinalEndingProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-8 border-t border-brand-border bg-brand-background text-center transition-colors duration-500 overflow-hidden">
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        {/* Calyxé Monogram */}
        <div className="flex justify-center">
          <CalyxeLogo size="xl" />
        </div>

        {/* Cinematic Climax Statement */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light tracking-wide text-brand-text leading-tight">
            YOUR LOOK.
            <br />
            YOUR MOMENT.
            <br />
            <span className="text-brand-primary italic">YOUR CALYXÉ.</span>
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-brand-muted font-medium pt-2">
            BOOK YOUR EXPERIENCE
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBooking}
            data-interactive
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-primary text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-brand-secondary transition-all duration-300 shadow-[0_4px_25px_rgba(184,134,11,0.3)] hover:shadow-[0_6px_35px_rgba(184,134,11,0.5)] flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>

          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Calyxé, I would like to book an appointment.")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 font-semibold text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Signature Subtext */}
        <div className="pt-6 text-xs tracking-[0.25em] uppercase text-brand-muted font-light">
          <p>{SALON_INFO.fullName}</p>
          <p className="text-brand-primary/80 mt-1">Hanamkonda, Telangana, India</p>
        </div>
      </div>
    </section>
  );
};
