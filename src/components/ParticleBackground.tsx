"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (reducedMotion) return null;

  return (
    <Particles
      id="orbis-bg"
      init={init}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      options={{
        background: { color: "#F5F7FF" },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: { value: 80, density: { enable: true, area: 900 } },
          color: { value: "#4169FF" },
          opacity: {
            value: 0.18,
            random: { enable: true, minimumValue: 0.08 },
          },
          size: {
            value: { min: 1.5, max: 2.5 },
            random: { enable: true, minimumValue: 1.5 },
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
          orbit: {
            enable: true,
            radius: { min: 80, max: 150 },
            speed: { min: 0.3, max: 0.5 },
            opacity: 0.06,
            animation: { enable: true },
          },
          links: {
            enable: true,
            color: "#4169FF",
            opacity: 0.08,
            distance: 130,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: false },
          },
          modes: {
            grab: {
              distance: 120,
              links: { opacity: 0.2 },
            },
          },
        },
      }}
    />
  );
}
