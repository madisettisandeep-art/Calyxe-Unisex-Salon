"use client";

import React from "react";
import { CalyxeLogo } from "./CalyxeLogo";
import { SALON_INFO } from "@/data/salon-data";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-8 border-t border-brand-border bg-brand-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <CalyxeLogo size="md" />
          <p className="text-xs text-brand-muted font-light max-w-sm">
            Hanamkonda, Telangana. Where architectural design meets couture hair and beauty rituals.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.18em] text-brand-muted">
          <a href="#walkthrough-experience" data-interactive className="hover:text-brand-primary transition-colors">
            Experience
          </a>
          <a href="#services-section" data-interactive className="hover:text-brand-primary transition-colors">
            Services
          </a>
          <a href="#transformations-section" data-interactive className="hover:text-brand-primary transition-colors">
            Transformations
          </a>
          <a href="#reviews-section" data-interactive className="hover:text-brand-primary transition-colors">
            Reviews
          </a>
          <a href={`tel:${SALON_INFO.phone}`} data-interactive className="hover:text-brand-primary transition-colors">
            Call
          </a>
          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="hover:text-brand-primary transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="hover:text-brand-primary transition-colors"
          >
            Directions
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-brand-muted/70 font-mono">
          © {new Date().getFullYear()} CALYXÉ. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
