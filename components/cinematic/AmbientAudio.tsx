"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      // Fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.001, audioCtxRef.current.currentTime, 0.4);
        setTimeout(() => {
          setIsPlaying(false);
        }, 400);
      } else {
        setIsPlaying(false);
      }
    } else {
      // Initialize AudioContext on user gesture
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2.5); // very subtle
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm 432Hz Calm Harmonic
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(108, ctx.currentTime); // Soft low C harmonic
        const filter1 = ctx.createBiquadFilter();
        filter1.type = "lowpass";
        filter1.frequency.setValueAtTime(280, ctx.currentTime);
        osc1.connect(filter1);
        filter1.connect(masterGain);
        osc1.start();
        osc1Ref.current = osc1;

        // Secondary Shimmer
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(216, ctx.currentTime);
        const filter2 = ctx.createBiquadFilter();
        filter2.type = "lowpass";
        filter2.frequency.setValueAtTime(400, ctx.currentTime);
        osc2.connect(filter2);
        filter2.connect(masterGain);
        osc2.start();
        osc2Ref.current = osc2;

        setIsPlaying(true);
      } catch {
        // AudioContext not supported
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      data-interactive
      aria-label={isPlaying ? "Mute salon ambient sound" : "Enable salon ambient sound"}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 glass-pill hover:border-brand-primary/60"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
          <span className="text-brand-primary hidden sm:inline">Ambience On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-brand-muted" />
          <span className="text-brand-muted hidden sm:inline">Ambience</span>
        </>
      )}
    </button>
  );
};
