"use client";

import React from "react";
import { CalyxeLogo } from "../ui/CalyxeLogo";
import { ThemeToggle } from "./ThemeToggle";
import { AmbientAudio } from "../cinematic/AmbientAudio";
import { Menu, Phone, MessageSquare, Calendar } from "lucide-react";
import { SALON_INFO } from "@/data/salon-data";

interface MinimalNavProps {
  onOpenMenu: () => void;
  onOpenBooking: () => void;
  currentSceneNumber?: string;
}

export const MinimalNav: React.FC<MinimalNavProps> = ({
  onOpenMenu,
  onOpenBooking,
  currentSceneNumber = "01",
}) => {
  return (
    <>
      {/* Top Floating Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 sm:py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#walkthrough-experience"
            data-interactive
            aria-label="Calyxé Unisex Salon Home"
            className="group flex items-center"
          >
            <CalyxeLogo size="md" />
          </a>

          {/* Center Walkthrough Tracker */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[11px] font-medium tracking-[0.2em] uppercase text-brand-muted">
            <span className="text-brand-primary">SCENE</span>
            <span className="font-mono text-brand-text">{currentSceneNumber}</span>
            <span className="text-brand-muted/60">/ 12</span>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Ambient Soundscape */}
            <AmbientAudio />

            {/* Day / Night Luxury Toggle */}
            <ThemeToggle />

            {/* Desktop Direct Book CTA */}
            <button
              onClick={onOpenBooking}
              data-interactive
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] bg-brand-primary text-white hover:bg-brand-secondary transition-all duration-300 shadow-[0_2px_12px_rgba(184,134,11,0.3)] hover:shadow-[0_4px_18px_rgba(184,134,11,0.5)]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>

            {/* Menu Trigger */}
            <button
              onClick={onOpenMenu}
              data-interactive
              aria-label="Open navigation menu"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill hover:border-brand-primary/60 transition-all duration-300"
            >
              <Menu className="w-4 h-4 text-brand-primary" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-text hidden lg:inline">
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Persistent Floating Bottom Action Dock */}
      <div className="fixed bottom-3 left-3 right-3 z-40 sm:hidden">
        <div className="flex items-center justify-between gap-2 p-2 rounded-2xl glass-panel shadow-2xl border border-brand-border">
          {/* Quick Call */}
          <a
            href={`tel:${SALON_INFO.phone}`}
            data-interactive
            aria-label="Call Calyxé Salon"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-surface border border-brand-border text-brand-text active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-brand-primary" />
          </a>

          {/* Direct WhatsApp */}
          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Calyxé, I would like to book an appointment.")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            aria-label="WhatsApp Calyxé Salon"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] active:scale-95 transition-transform"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          {/* Primary Book Button */}
          <button
            onClick={onOpenBooking}
            data-interactive
            className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-brand-primary text-white font-semibold text-xs tracking-[0.15em] uppercase active:scale-95 transition-transform shadow-md hover:bg-brand-secondary"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </>
  );
};
