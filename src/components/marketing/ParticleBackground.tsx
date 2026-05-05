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
const MOUSE_GRAB_RADIUS = 180;
const MOUSE_REPEL_RADIUS = 80;
const MOUSE_REPEL_STRENGTH = 0.012;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        if (p.isOrbiter) {
          p.angle += p.orbitSpeed;
          p.x = p.cx + Math.cos(p.angle) * p.orbitRadius;
          p.y = p.cy + Math.sin(p.angle) * p.orbitRadius;
        } else {
          // Soft repulsion away from cursor
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < MOUSE_REPEL_RADIUS && mdist > 0) {
            const force = (1 - mdist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
            p.vx += (mdx / mdist) * force;
            p.vy += (mdy / mdist) * force;
          }

          // Speed cap so repulsion doesn't send particles flying
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.8) {
            p.vx = (p.vx / speed) * 1.8;
            p.vy = (p.vy / speed) * 1.8;
          }

          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }
      }

      // Links — boosted opacity near cursor
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const baseLine = (1 - dist / LINK_DISTANCE) * 0.08;

            // Proximity of either endpoint to the mouse
            const mi = Math.sqrt((particles[i].x - mouse.x) ** 2 + (particles[i].y - mouse.y) ** 2);
            const mj = Math.sqrt((particles[j].x - mouse.x) ** 2 + (particles[j].y - mouse.y) ** 2);
            const closest = Math.min(mi, mj);
            const boost = closest < MOUSE_GRAB_RADIUS
              ? (1 - closest / MOUSE_GRAB_RADIUS) * 0.35
              : 0;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${COLOR}, ${Math.min(baseLine + boost, 0.45)})`;
            ctx.lineWidth = boost > 0 ? 1.2 : 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles — glow near cursor
      for (const p of particles) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const proximity = mdist < MOUSE_GRAB_RADIUS ? 1 - mdist / MOUSE_GRAB_RADIUS : 0;
        const r = p.radius + proximity * 1.5;
        const op = Math.min(p.opacity + proximity * 0.4, 0.65);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, ${op})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else draw();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
