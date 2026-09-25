"use client";

import React, { useState } from "react";
import { SALON_SERVICES, ServiceItem } from "@/data/salon-data";
import { Sparkles, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

interface ServiceSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

const CATEGORIES = [
  "HAIR",
  "SKIN & BEAUTY",
  "GROOMING",
  "SPA / RELAXATION",
  "TRANSFORMATIONS",
  "BRIDAL / OCCASIONS",
] as const;

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("HAIR");

  const filteredServices = SALON_SERVICES.filter(
    (s) => s.category === activeCategory
  );

  return (
    <section
      id="services-section"
      className="relative py-24 sm:py-32 px-4 sm:px-8 border-t border-brand-border bg-brand-background transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-brand-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Service Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light tracking-tight text-brand-text">
              DISCOVER ARTISTRY
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-brand-muted font-light leading-relaxed">
            Each treatment is tailored to your hair biology, facial geometry, and lifestyle. Consult with our master artisans.
          </p>
        </div>

        {/* Minimalist Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-brand-border">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-interactive
                className={`whitespace-nowrap px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                    : "text-brand-muted hover:text-brand-text glass-pill"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Service Discoveries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border hover:border-brand-primary/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                    {service.gender}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-editorial font-light text-brand-text tracking-wide group-hover:text-brand-primary transition-colors">
                  {service.service_name}
                </h3>

                <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Action Bottom */}
              <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider text-brand-primary">
                  {service.priceFormatted}
                </span>

                <button
                  onClick={() => onSelectServiceForBooking(service.service_name)}
                  data-interactive
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-semibold text-brand-text group-hover:text-brand-primary transition-colors"
                >
                  <span>Select Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
