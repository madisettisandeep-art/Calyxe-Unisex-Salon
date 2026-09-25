"use client";

import React, { useState } from "react";
import { SALON_SERVICES, SALON_INFO, generateWhatsAppBookingMessage } from "@/data/salon-data";
import { Calendar, Clock, User, Phone, MessageSquare, Check, Sparkles, AlertCircle } from "lucide-react";

interface BookingDeskProps {
  initialService?: string;
}

export const BookingDesk: React.FC<BookingDeskProps> = ({ initialService = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: initialService || SALON_SERVICES[0]?.service_name || "",
    preferredDate: "",
    preferredTime: "11:00 AM",
    stylist: "Any Available Master Stylist",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = [
    "10:30 AM",
    "11:30 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
    "07:30 PM",
  ];

  const stylists = [
    "Any Available Master Stylist",
    "Senior Creative Hair Artisan",
    "Master Color & Balayage Specialist",
    "Aesthetician & Skin Specialist",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError("Please provide both your name and phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to book");

      setConfirmed(true);
    } catch {
      setError("Unable to connect to reservation service. You can book directly via WhatsApp!");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppHref = () => {
    const msg = generateWhatsAppBookingMessage({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      stylist: formData.stylist,
      notes: formData.notes,
    });
    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section
      id="booking-section"
      className="relative py-28 sm:py-36 px-4 sm:px-8 border-t border-brand-border bg-brand-background transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-brand-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Reservation Desk</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-editorial font-light tracking-tight text-brand-text">
            YOUR CHAIR AWAITS.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-light max-w-lg mx-auto leading-relaxed">
            &ldquo;Choose your service. Choose your time. We&apos;ll take care of the rest.&rdquo;
          </p>
        </div>

        {/* Booking Card */}
        <div className="relative p-6 sm:p-12 rounded-3xl glass-panel border border-brand-border shadow-2xl overflow-hidden">
          {confirmed ? (
            /* Confirmation State */
            <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/40 flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-editorial font-light text-brand-text">
                  Reservation Received, {formData.name}
                </h3>
                <p className="text-sm text-brand-muted font-light max-w-md mx-auto">
                  Our concierge desk at Calyxé is preparing your visit for {formData.preferredDate || "your chosen date"} at {formData.preferredTime}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border max-w-md mx-auto text-left text-xs font-mono space-y-1.5 text-brand-muted">
                <p><span className="text-brand-text font-semibold">Service:</span> {formData.service}</p>
                <p><span className="text-brand-text font-semibold">Stylist:</span> {formData.stylist}</p>
                <p><span className="text-brand-text font-semibold">Phone:</span> {formData.phone}</p>
                <p><span className="text-brand-text font-semibold">Location:</span> Circuit House Road, Hanamkonda</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-xs uppercase tracking-[0.15em] hover:bg-[#20bd5a] transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp</span>
                </a>

                <button
                  onClick={() => setConfirmed(false)}
                  data-interactive
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full glass-pill text-xs uppercase tracking-[0.15em] text-brand-muted hover:text-brand-text transition-colors"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wider uppercase text-brand-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditi Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-interactive
                    className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wider uppercase text-brand-muted flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 091009 20304"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-interactive
                    className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-xs font-medium tracking-wider uppercase text-brand-muted flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Choose Service *</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  data-interactive
                  className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-primary text-sm transition-colors"
                >
                  {SALON_SERVICES.map((s) => (
                    <option key={s.id} value={s.service_name} className="bg-brand-surface-solid text-brand-text">
                      [{s.category}] {s.service_name} ({s.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wider uppercase text-brand-muted flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    data-interactive
                    className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wider uppercase text-brand-muted flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    data-interactive
                    className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-brand-surface-solid text-brand-text">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stylist Preference */}
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wider uppercase text-brand-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Stylist Preference</span>
                  </label>
                  <select
                    value={formData.stylist}
                    onChange={(e) => setFormData({ ...formData, stylist: e.target.value })}
                    data-interactive
                    className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-primary text-sm transition-colors"
                  >
                    {stylists.map((st) => (
                      <option key={st} value={st} className="bg-brand-surface-solid text-brand-text">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message / Specific Requests */}
              <div className="space-y-2">
                <label className="text-xs font-medium tracking-wider uppercase text-brand-muted">
                  Special Notes or Hair Inquiries (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for subtle balayage, sensitive scalp care, bridal consultation..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  data-interactive
                  className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-primary text-sm transition-colors"
                />
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                {/* Primary CTA: Book Appointment */}
                <button
                  type="submit"
                  disabled={loading}
                  data-interactive
                  className="w-full sm:flex-1 py-4 rounded-full bg-brand-primary text-white font-semibold text-xs uppercase tracking-[0.2em] hover:bg-brand-secondary transition-all duration-300 shadow-[0_4px_20px_rgba(184,134,11,0.25)] hover:shadow-[0_6px_25px_rgba(184,134,11,0.4)] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{loading ? "Processing..." : "Book Appointment"}</span>
                </button>

                {/* Secondary CTA: WhatsApp Us */}
                <a
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 font-semibold text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>

                {/* Tertiary CTA: Call Calyxé */}
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  data-interactive
                  className="w-full sm:w-auto px-6 py-4 rounded-full glass-pill border border-brand-border text-brand-text hover:border-brand-primary font-semibold text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-primary" />
                  <span>Call Calyxé</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
