"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDirection: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const area = window.innerWidth * window.innerHeight;
      const count = Math.floor(area / 18000);
      particles = Array.from({ length: Math.min(count, 90) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3 - 0.05,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.3 + 0.12,
        opacityDirection: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const drawConnections = (p: Particle) => {
      for (const other of particles) {
        if (other === p) continue;
        const dx = p.x - other.x;
        const dy = p.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(other.x, other.y);
          const lineOpacity = (1 - dist / 150) * 0.08;
          ctx!.strokeStyle = `rgba(160, 140, 120, ${lineOpacity})`;
          ctx!.lineWidth = 0.6;
          ctx!.stroke();
        }
      }
    };

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const animate = () => {
      ctx!.clearRect(0, 0, w(), h());

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // opacity pulse
        p.opacity += p.opacityDirection * 0.001;
        if (p.opacity > 0.35) p.opacityDirection = -1;
        if (p.opacity < 0.08) p.opacityDirection = 1;

        // wrap around
        if (p.x < -10) p.x = w() + 10;
        if (p.x > w() + 10) p.x = -10;
        if (p.y < -10) p.y = h() + 10;
        if (p.y > h() + 10) p.y = -10;

        // draw dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(160, 140, 120, ${p.opacity})`;
        ctx!.fill();

        drawConnections(p);
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    const onResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
