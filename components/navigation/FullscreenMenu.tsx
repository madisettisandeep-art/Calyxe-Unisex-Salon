"use client";

import React from "react";
import { X, ArrowUpRight, Phone, MessageSquare, MapPin, Clock } from "lucide-react";
import { CalyxeLogo } from "../ui/CalyxeLogo";
import { SALON_INFO } from "@/data/salon-data";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: "EXPERIENCE", subtitle: "Cinematic Walkthrough", id: "walkthrough-experience" },
    { label: "SERVICES", subtitle: "Hair & Skin Artistry", id: "services-section" },
    { label: "TRANSFORMATIONS", subtitle: "Before & After Showcase", id: "transformations-section" },
    { label: "ABOUT CALYXÉ", subtitle: "The Philosophy & Space", id: "about-section" },
    { label: "CLIENT REVIEWS", subtitle: "4.9★ Google Community", id: "reviews-section" },
    { label: "RESERVATION DESK", subtitle: "Book Appointment", id: "booking-section" },
    { label: "CONTACT & LOCATION", subtitle: "Circuit House Road", id: "contact-section" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-brand-background/98 text-brand-text backdrop-blur-2xl p-4 sm:p-12 pb-24 sm:pb-12 overflow-y-auto animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full pb-6 sm:pb-8 border-b border-brand-border">
        <CalyxeLogo size="sm" className="sm:hidden" />
        <CalyxeLogo size="lg" className="hidden sm:flex" />
        <button
          onClick={onClose}
          data-interactive
          aria-label="Close menu"
          className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-brand-border text-brand-text hover:border-brand-primary transition-all duration-300 glass-pill"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Close</span>
          <X className="w-4 h-4 text-brand-primary" />
        </button>
      </div>

      {/* Main Nav Links */}
      <div className="max-w-7xl mx-auto w-full py-8 md:py-12">
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {menuItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              data-interactive
              className="group flex flex-col items-start text-left p-4 rounded-xl hover:bg-brand-primary/5 transition-all duration-300 border-l border-transparent hover:border-brand-primary"
            >
              <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-brand-primary font-mono font-medium">
                <span>{(idx + 1).toString().padStart(2, "0")}</span>
                <span className="w-6 h-[1px] bg-brand-primary/40" />
                <span className="uppercase text-[10px] tracking-[0.25em] text-brand-muted">
                  {item.subtitle}
                </span>
              </div>
              <div className="flex items-center justify-between w-full mt-1">
                <span className="text-2xl sm:text-4xl font-editorial font-light tracking-wide text-brand-text group-hover:text-brand-primary transition-colors duration-300">
                  {item.label}
                </span>
                <ArrowUpRight className="w-5 h-5 text-brand-primary/50 group-hover:text-brand-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer Details */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-brand-border grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-brand-muted font-light">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-brand-text font-medium">Calyxé Unisex Salon</p>
            <p>{SALON_INFO.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-brand-text font-medium">Hours</p>
            <p>{SALON_INFO.openingHours}</p>
            <p>{SALON_INFO.openingDays}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:justify-end">
          <a
            href={`tel:${SALON_INFO.phone}`}
            data-interactive
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border text-brand-text hover:border-brand-primary transition-colors glass-pill"
          >
            <Phone className="w-3.5 h-3.5 text-brand-primary" />
            <span>Call 091009 20304</span>
          </a>
          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/25 transition-colors font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
