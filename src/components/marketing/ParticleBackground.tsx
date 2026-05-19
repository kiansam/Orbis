"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  cx: number;
  cy: number;
  isOrbiter: boolean;
}

const PARTICLE_COUNT = 90;
const LINK_DISTANCE = 130;
const COLOR = "65, 105, 255";
const FOCAL_RADIUS = 220;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let particles: Particle[] = [];

    // Focal point: virtual light source driven by scroll
    const focal = { x: 0, y: 0 };
    const focalTarget = { x: 0, y: 0 };
    let scrollRatio = 0;

    function updateFocalTarget() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRatio = Math.min(window.scrollY / maxScroll, 1);
      // Traces a gentle arc across the canvas as user scrolls
      focalTarget.x = canvas.width * (0.25 + 0.5 * Math.sin(scrollRatio * Math.PI));
      focalTarget.y = canvas.height * (0.15 + 0.7 * scrollRatio);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateFocalTarget();
      focal.x = focalTarget.x;
      focal.y = focalTarget.y;
      init();
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const isOrbiter = i < 4;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.2 + 0.8,
          opacity: Math.random() * 0.15 + 0.08,
          angle: Math.random() * Math.PI * 2,
          orbitRadius: Math.random() * 80 + 60,
          orbitSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
          cx: Math.random() * canvas.width,
          cy: Math.random() * canvas.height,
          isOrbiter,
        };
      });
    }

    function draw() {
      // Smoothly lerp focal toward target
      focal.x += (focalTarget.x - focal.x) * 0.04;
      focal.y += (focalTarget.y - focal.y) * 0.04;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        if (p.isOrbiter) {
          p.angle += p.orbitSpeed;
          p.x = p.cx + Math.cos(p.angle) * p.orbitRadius;
          p.y = p.cy + Math.sin(p.angle) * p.orbitRadius;
        } else {
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.2) {
            p.vx = (p.vx / speed) * 1.2;
            p.vy = (p.vy / speed) * 1.2;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }
      }

      // Links — boosted opacity near focal point
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const baseLine = (1 - dist / LINK_DISTANCE) * 0.08;

            const fi = Math.sqrt((particles[i].x - focal.x) ** 2 + (particles[i].y - focal.y) ** 2);
            const fj = Math.sqrt((particles[j].x - focal.x) ** 2 + (particles[j].y - focal.y) ** 2);
            const closest = Math.min(fi, fj);
            const boost = closest < FOCAL_RADIUS ? (1 - closest / FOCAL_RADIUS) * 0.3 : 0;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${COLOR}, ${Math.min(baseLine + boost, 0.4)})`;
            ctx.lineWidth = boost > 0 ? 1.2 : 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles — glow near focal point
      for (const p of particles) {
        const fdx = p.x - focal.x;
        const fdy = p.y - focal.y;
        const fdist = Math.sqrt(fdx * fdx + fdy * fdy);
        const proximity = fdist < FOCAL_RADIUS ? 1 - fdist / FOCAL_RADIUS : 0;
        const r = p.radius + proximity * 1.2;
        const op = Math.min(p.opacity + proximity * 0.35, 0.6);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, ${op})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    const handleScroll = () => {
      updateFocalTarget();
    };

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else draw();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#F6F8FF",
      }}
    />
  );
}
