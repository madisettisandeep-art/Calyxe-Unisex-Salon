"use client";

import React from "react";
import { SALON_INFO } from "@/data/salon-data";
import { MapPin, Phone, MessageSquare, Clock, Navigation } from "lucide-react";

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="contact-section"
      className="relative py-24 sm:py-32 px-4 sm:px-8 border-t border-brand-border bg-brand-background transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-brand-primary">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location & Hours</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-brand-text">
              FIND CALYXÉ
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-brand-muted font-light leading-relaxed">
            Conveniently situated in KLN Reddy Colony, Subedari, directly accessible from Circuit House Road.
          </p>
        </div>

        {/* Info & Map Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl glass-panel border border-brand-border flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Address */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-primary">
                  Address & Landmarks
                </span>
                <p className="text-lg font-editorial font-light text-brand-text leading-snug">
                  {SALON_INFO.address}
                </p>
                <p className="text-xs text-brand-muted font-light">
                  {SALON_INFO.landmark}
                </p>
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-primary">
                  Salon Hours
                </span>
                <div className="flex items-center gap-2 text-base text-brand-text font-editorial font-light">
                  <Clock className="w-4 h-4 text-brand-primary" />
                  <span>{SALON_INFO.openingHours}</span>
                </div>
                <p className="text-xs text-brand-muted font-light">
                  {SALON_INFO.openingDays}
                </p>
              </div>

              {/* Direct Telephone */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-primary">
                  Telephone Inquiries
                </span>
                <p className="text-xl font-mono text-brand-text">
                  {SALON_INFO.phone}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="flex-1 py-3.5 px-4 rounded-full bg-brand-primary text-white font-semibold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-brand-secondary transition-colors shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${SALON_INFO.phone}`}
                data-interactive
                className="py-3.5 px-5 rounded-full glass-pill border border-brand-border text-brand-text hover:border-brand-primary font-semibold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-primary" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 min-h-[360px] lg:min-h-full rounded-3xl overflow-hidden glass-panel border border-brand-border relative">
            <iframe
              title="Calyxé Unisex Salon Location Map"
              src="https://maps.google.com/maps?q=Calyxe+Unisex+Salon+Circuit+House+Road+Hanamkonda&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale contrast-125 opacity-85 dark:invert dark:hue-rotate-180 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
