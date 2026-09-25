"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/cinematic/LoadingScreen";
import { MinimalNav } from "@/components/navigation/MinimalNav";
import { WalkthroughEngine } from "@/components/cinematic/WalkthroughEngine";
import { BrandStory } from "@/components/ui/BrandStory";
import { ServiceSection } from "@/components/services/ServiceSection";
import { FinalEnding } from "@/components/ui/FinalEnding";
import { Footer } from "@/components/ui/Footer";
import {
  TransformationSliderSkeleton,
  ReviewsSkeleton,
  BookingDeskSkeleton,
} from "@/components/ui/Skeletons";

// 9 & 17. Split code into chunks & Add Lazy Loading for heavy off-screen components
const TransformationSlider = dynamic(
  () =>
    import("@/components/gallery/TransformationSlider").then(
      (mod) => mod.TransformationSlider
    ),
  {
    loading: () => <TransformationSliderSkeleton />,
    ssr: false,
  }
);

const CinematicReviews = dynamic(
  () =>
    import("@/components/reviews/CinematicReviews").then(
      (mod) => mod.CinematicReviews
    ),
  {
    loading: () => <ReviewsSkeleton />,
    ssr: false,
  }
);

const BookingDesk = dynamic(
  () =>
    import("@/components/booking/BookingDesk").then((mod) => mod.BookingDesk),
  {
    loading: () => <BookingDeskSkeleton />,
    ssr: false,
  }
);

const ContactSection = dynamic(
  () =>
    import("@/components/booking/ContactSection").then(
      (mod) => mod.ContactSection
    ),
  {
    ssr: false,
  }
);

// 18. Defer non-critical navigation menu chunk until opened
const FullscreenMenu = dynamic(
  () =>
    import("@/components/navigation/FullscreenMenu").then(
      (mod) => mod.FullscreenMenu
    ),
  {
    ssr: false,
  }
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSceneNumber, setCurrentSceneNumber] = useState("01");
  const [bookingService, setBookingService] = useState("");

  // 15. Memoized callbacks to avoid unnecessary child re-renders
  const handleSceneChange = useCallback((sceneIndex: number) => {
    const num = (sceneIndex + 1).toString().padStart(2, "0");
    setCurrentSceneNumber(num);
  }, []);

  const handleOpenBooking = useCallback(() => {
    const desk = document.getElementById("booking-section");
    if (desk) {
      desk.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSelectServiceForBooking = useCallback(
    (serviceName: string) => {
      setBookingService(serviceName);
      handleOpenBooking();
    },
    [handleOpenBooking]
  );

  const handleExploreCategory = useCallback((category: string) => {
    const section = document.getElementById("services-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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

      {/* Fullscreen Cinematic Navigation Overlay - Loaded on demand */}
      {menuOpen && (
        <FullscreenMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onNavigate={handleNavigateSection}
        />
      )}

      {/* Core Experience: 12-Scene Scroll-Driven Cinematic Walkthrough */}
      <WalkthroughEngine
        onSceneChange={handleSceneChange}
        onExploreService={handleExploreCategory}
        onOpenBooking={handleOpenBooking}
      />

      {/* Editorial Brand Story: "The Calyxé Experience" */}
      <BrandStory />

      {/* Service Discoveries with Category Indexing & Pagination */}
      <ServiceSection onSelectServiceForBooking={handleSelectServiceForBooking} />

      {/* 9 & 17. Lazy-loaded Draggable Transformation Gallery */}
      <TransformationSlider />

      {/* 9 & 17. Lazy-loaded 4.9 ★ Floating Editorial Reviews */}
      <CinematicReviews />

      {/* 9 & 17. Lazy-loaded Concierge Booking Desk */}
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
