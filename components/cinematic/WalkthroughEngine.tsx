"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as THREE from "three";
import { WALKTHROUGH_SCENES, SceneData } from "@/data/salon-data";
import { ChevronDown, Sparkles, X, ArrowRight, Compass } from "lucide-react";

interface WalkthroughEngineProps {
  onSceneChange?: (sceneIndex: number) => void;
  onExploreService?: (category: string) => void;
  onOpenBooking?: () => void;
}

export const WalkthroughEngine: React.FC<WalkthroughEngineProps> = ({
  onSceneChange,
  onExploreService,
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<SceneData["hotspot"] | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const scenes = WALKTHROUGH_SCENES;
  const totalScenes = scenes.length;

  // Eagerly preload all scene images in background for instant transitions
  useEffect(() => {
    if (typeof window !== "undefined") {
      scenes.forEach((scene) => {
        const img = new window.Image();
        img.src = scene.image;
      });
    }
  }, [scenes]);

  // Handle Resize & Device Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Three.js Atmospheric Motes & Ambient Lighting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false, // optimize performance
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } catch {
      return; // WebGL not supported
    }

    // Atmospheric Floating Gold & Warm Amber Particles
    const particleCount = isMobile ? 40 : 110;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random() * 0.8 + 0.3;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Particle Shader / Material
    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const onResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.04;

      // Subtle responsive parallax
      camera.position.x += (mouseOffset.x * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (-mouseOffset.y * 0.2 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [mouseOffset, isMobile]);

  // Desktop Mouse Parallax Listener
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseOffset({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Scroll Synchronization
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollHeight = container.scrollHeight - window.innerHeight;
    const currentScrolled = -rect.top;

    const progress = Math.max(0, Math.min(1, currentScrolled / scrollHeight));
    setScrollProgress(progress);

    // Determine current active scene
    const sceneIndex = Math.min(
      totalScenes - 1,
      Math.floor(progress * totalScenes)
    );

    if (sceneIndex !== currentSceneIdx) {
      setCurrentSceneIdx(sceneIndex);
      if (onSceneChange) onSceneChange(sceneIndex);
    }
  }, [totalScenes, currentSceneIdx, onSceneChange]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Jump to specific scene smoothly
  const scrollToScene = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollHeight = container.scrollHeight - window.innerHeight;
    const targetScroll = (index / (totalScenes - 1)) * scrollHeight;
    const targetPosition = container.offsetTop + targetScroll;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  const currentScene = scenes[currentSceneIdx] || scenes[0];

  // Calculate local progress inside the current scene (0 to 1) for zoom forward effect
  const sceneSlot = 1 / totalScenes;
  const currentSceneStart = currentSceneIdx * sceneSlot;
  const localProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - currentSceneStart) / sceneSlot)
  );
  // Forward motion scale: 1.0 -> 1.08 giving optical walking forward feeling
  const forwardZoom = 1.0 + localProgress * 0.08;

  return (
    <div
      ref={containerRef}
      id="walkthrough-experience"
      className="relative w-full"
      style={{ height: `${totalScenes * 100}vh` }}
    >
      {/* Sticky Fullscreen Walkthrough Projection Layer */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden select-none bg-brand-background">
        {/* Layer 1: Photographic Projection with Crossfade & Walking Camera Zoom */}
        {scenes.map((scene, idx) => {
          const isActive = idx === currentSceneIdx;

          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-out will-change-transform ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{
                transform: isActive
                  ? `scale(${forwardZoom}) translate3d(${mouseOffset.x * 6}px, ${
                      mouseOffset.y * 4
                    }px, 0)`
                  : "scale(1.0)",
              }}
            >
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                priority={idx <= 3}
                loading={idx <= 3 ? "eager" : "lazy"}
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Luxury Contrast Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none dark:from-black/85 dark:via-black/35 dark:to-black/60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />
            </div>
          );
        })}

        {/* Layer 2: Three.js 3D Particles & Atmospheric Motes Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />

        {/* Layer 3: Interactive Hotspot in Environment */}
        {currentScene.hotspot && (
          <div
            className="absolute z-30 transition-all duration-500"
            style={{
              top: isMobile ? "45%" : "52%",
              left: isMobile ? "50%" : "62%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              onClick={() => setActiveHotspot(currentScene.hotspot)}
              data-interactive
              aria-label={`Inspect ${currentScene.hotspot.title}`}
              className="group relative flex items-center justify-center p-3 rounded-full focus:outline-none"
            >
              {/* Outer pulsing ring */}
              <span className="absolute w-12 h-12 rounded-full border border-brand-primary/60 animate-ping opacity-75" />
              {/* Inner glowing core */}
              <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary text-white shadow-[0_0_20px_rgba(184,134,11,0.6)] transition-transform duration-300 group-hover:scale-125">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              {/* Tooltip on Desktop */}
              <span className="absolute left-10 ml-2 px-3 py-1 rounded-full text-[10px] tracking-widest font-medium uppercase text-brand-text bg-brand-surface/95 backdrop-blur-md border border-brand-border shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:inline-block">
                {currentScene.hotspot.title}
              </span>
            </button>
          </div>
        )}

        {/* Layer 4: Glass Hotspot Inspector Modal */}
        {activeHotspot && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl glass-panel text-brand-text border border-brand-border shadow-2xl">
              <button
                onClick={() => setActiveHotspot(null)}
                data-interactive
                aria-label="Close details"
                className="absolute top-4 right-4 p-2 rounded-full text-brand-muted hover:text-brand-text hover:bg-brand-primary/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-primary bg-brand-primary/15 border border-brand-primary/30">
                  <Sparkles className="w-3 h-3" />
                  {activeHotspot.category}
                </div>

                <h3 className="text-2xl font-editorial font-light tracking-wide text-brand-text">
                  {activeHotspot.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed font-light">
                  {activeHotspot.description}
                </p>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveHotspot(null);
                      if (activeHotspot.category === "BOOKING") {
                        if (onOpenBooking) onOpenBooking();
                      } else {
                        if (onExploreService) onExploreService(activeHotspot.category);
                      }
                    }}
                    data-interactive
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-brand-primary text-white hover:bg-brand-secondary transition-colors duration-300 shadow-md"
                  >
                    <span>{activeHotspot.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layer 5: Modern Cinematic HUD Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 sm:p-6 md:p-8">
          {/* Top Step Indicators (Cleanly aligned top-right below nav) */}
          <div className="flex items-center justify-end w-full max-w-7xl mx-auto pt-16 md:pt-20">
            <div className="hidden lg:flex items-center gap-1.5 pointer-events-auto p-1.5 rounded-full glass-pill border border-brand-border/70 shadow-sm">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => scrollToScene(idx)}
                  data-interactive
                  title={`Jump to Scene ${s.numberStr}: ${s.title}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === currentSceneIdx
                      ? "w-6 bg-brand-primary"
                      : "w-1.5 bg-brand-muted/30 hover:bg-brand-primary/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom HUD: Tucked into bottom corners to keep the walkthrough fully unobstructed */}
          <div className="w-full max-w-7xl mx-auto flex items-end justify-between gap-4 pb-2 sm:pb-4">
            {/* Compact Narrative Card in Bottom-Left Corner */}
            <div className="space-y-1 max-w-[270px] sm:max-w-xs md:max-w-sm text-left pointer-events-auto p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel bg-brand-surface/85 backdrop-blur-xl border border-brand-border/70 shadow-lg transition-all duration-300">
              <div className="inline-block text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-primary">
                {currentScene.subtitle}
              </div>
              <h2 className="text-base sm:text-xl font-editorial font-light text-brand-text tracking-wide leading-tight">
                {currentScene.title}
              </h2>
              <p className="text-[11px] sm:text-xs text-brand-muted font-light leading-snug line-clamp-2">
                {currentScene.description}
              </p>
            </div>

            {/* Compact Scroll / Swipe Prompt in Bottom-Right Corner */}
            <div className="flex flex-col items-end gap-1.5 text-brand-text pointer-events-auto p-2.5 sm:p-3 rounded-xl sm:rounded-2xl glass-pill bg-brand-surface/85 backdrop-blur-xl border border-brand-border/70 shadow-md">
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-brand-muted font-medium">
                <span>{isMobile ? "Swipe" : "Scroll"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-primary animate-bounce" />
              </div>
              <div className="w-16 sm:w-20 h-[2px] bg-brand-border overflow-hidden rounded-full">
                <div
                  className="h-full bg-brand-primary transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
