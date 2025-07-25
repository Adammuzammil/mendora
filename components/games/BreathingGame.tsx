// components/BreathingGame.tsx
"use client";

import { Wind } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const breathingPhases = [
  { label: "Inhale", duration: 4000 },
  { label: "Hold", duration: 4000 },
  { label: "Exhale", duration: 4000 },
  { label: "Hold", duration: 4000 },
];

export default function BreathingGame() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhase = breathingPhases[phaseIndex];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentPhase = breathingPhases[phaseIndex];

    // Set scale based on breathing phase
    if (currentPhase.label === "Inhale") setScale(1.5);
    else if (currentPhase.label === "Exhale") setScale(0.8);
    else setScale(1);

    // Clear any existing timer before setting a new one
    if (timerRef.current) clearTimeout(timerRef.current);

    // Only run timer if not paused
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        setPhaseIndex((prev) => (prev + 1) % breathingPhases.length);
      }, currentPhase.duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phaseIndex, isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const getLabel = () => {
    switch (currentPhase.label) {
      case "Inhale":
        return "Breathe In";
      case "Exhale":
        return "Breathe Out";
      default:
        return "Hold";
    }
  };

  // Set dynamic scale based on phase
  const getScale = () => {
    if (currentPhase.label === "Inhale") return 1.5;
    if (currentPhase.label === "Exhale") return 0.8;
    return 1;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      <motion.div
        className="relative w-32 h-32 mx-auto rounded-full bg-blue-400 opacity-80"
        animate={{ scale: getScale() }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={phaseIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col items-center gap-2">
            <Wind className="w-6 h-6" />
            <h3 className="text-2xl font-semibold">{getLabel()}</h3>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button variant="ghost" size="sm" onClick={togglePause}>
        {isPaused ? "Resume" : "Pause"}
      </Button>
    </div>
  );
}
