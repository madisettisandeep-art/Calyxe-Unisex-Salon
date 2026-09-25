"use client";

import React, { useState } from "react";
import { LoadingScreen } from "@/components/cinematic/LoadingScreen";
import { MinimalNav } from "@/components/navigation/MinimalNav";
import { FullscreenMenu } from "@/components/navigation/FullscreenMenu";
import { WalkthroughEngine } from "@/components/cinematic/WalkthroughEngine";
import { BrandStory } from "@/components/ui/BrandStory";
import { ServiceSection } from "@/components/services/ServiceSection";
import { TransformationSlider } from "@/components/gallery/TransformationSlider";
import { CinematicReviews } from "@/components/reviews/CinematicReviews";
import { BookingDesk } from "@/components/booking/BookingDesk";
import { ContactSection } from "@/components/booking/ContactSection";
import { FinalEnding } from "@/components/ui/FinalEnding";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSceneNumber, setCurrentSceneNumber] = useState("01");
  const [bookingService, setBookingService] = useState("");

  const handleSceneChange = (sceneIndex: number) => {
    const num = (sceneIndex + 1).toString().padStart(2, "0");
    setCurrentSceneNumber(num);
  };

  const handleOpenBooking = () => {
    const desk = document.getElementById("booking-section");
    if (desk) {
      desk.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setBookingService(serviceName);
    handleOpenBooking();
  };

  const handleExploreCategory = (category: string) => {
    const section = document.getElementById("services-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-brand-background text-brand-text selection:bg-brand-primary selection:text-white">
      {/* Luxury 0-100% Preloader */}
      <LoadingScreen />

      {/* Floating Minimal Navigation Header */}
      <MinimalNav
        onOpenMenu={() => setMenuOpen(true)}
        onOpenBooking={handleOpenBooking}
        currentSceneNumber={currentSceneNumber}
      />

      {/* Fullscreen Cinematic Navigation Overlay */}
      <FullscreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigateSection}
      />

      {/* Core Experience: 12-Scene Scroll-Driven Cinematic Walkthrough */}
      <WalkthroughEngine
        onSceneChange={handleSceneChange}
        onExploreService={handleExploreCategory}
        onOpenBooking={handleOpenBooking}
      />

      {/* Editorial Brand Story: "The Calyxé Experience" */}
      <BrandStory />

      {/* Service Discoveries */}
      <ServiceSection onSelectServiceForBooking={handleSelectServiceForBooking} />

      {/* Interactive Draggable Transformation Gallery */}
      <TransformationSlider />

      {/* 4.9 ★ Floating Editorial Reviews */}
      <CinematicReviews />

      {/* Arrival at Concierge Booking Desk */}
      <BookingDesk initialService={bookingService} />

      {/* Contact & Circuit House Road Google Map */}
      <ContactSection onOpenBooking={handleOpenBooking} />

      {/* Final Cinematic Climax Moment */}
      <FinalEnding onOpenBooking={handleOpenBooking} />

      {/* Minimalist Footer */}
      <Footer />
    </main>
  );
}
