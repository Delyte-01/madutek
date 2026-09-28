"use client";
import { useEffect, useRef } from "react";

interface Orbit {
  r: number;
  speed: number;
  phase: number;
  dotR: number;
  dotColor: string;
  glowR: number;
}

export function OrbitalDecoration() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Define fixed height
    const H = 420;

    // Orbit configurations
    const orbits: Orbit[] = [
      {
        r: 62,
        speed: 0.0042,
        phase: 0,
        dotR: 5,
        dotColor: "#EA580C",
        glowR: 14,
      },
      {
        r: 110,
        speed: 0.0027,
        phase: 1.1,
        dotR: 4,
        dotColor: "#F97316",
        glowR: 11,
      },
      {
        r: 158,
        speed: 0.0016,
        phase: 2.4,
        dotR: 3.5,
        dotColor: "#FB923C",
        glowR: 9,
      },
      {
        r: 202,
        speed: 0.001,
        phase: 0.7,
        dotR: 3,
        dotColor: "#FDBA74",
        glowR: 7,
      },
    ];

    // Constellation pairings
    const constellations: [number, number][] = [];

    let W = canvas.parentElement?.offsetWidth || window.innerWidth;
    let cx = W * 0.5;
    let cy = H * 0.5;

    // Ambient floating particles
    const particles = Array.from({ length: 28 }, () => ({
      x: cx + (Math.random() - 0.5) * 440,
      y: cy + (Math.random() - 0.5) * 380,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      speed: (Math.random() - 0.5) * 0.12,
      dy: (Math.random() - 0.5) * 0.08,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Setup Dimensions and Scaling for Retina/High-Res displays
    const handleResize = () => {
      W = canvas.parentElement?.offsetWidth || window.innerWidth;
      cx = W * 0.5;
      cy = H * 0.5;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // --- Helper Functions ---
    const getOrbitalPos = (orb: Orbit, time: number) => {
      const angle = time * orb.speed + orb.phase;
      return {
        x: cx + Math.cos(angle) * orb.r,
        y: cy + Math.sin(angle) * orb.r * 0.38,
      };
    };

    const drawRing = (r: number, alpha: number, dashes: number[]) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.38);
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r, 0, 0, Math.PI * 2);
      if (dashes.length > 0) ctx.setLineDash(dashes);
      ctx.strokeStyle = `rgba(234,88,12,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    };

    const drawGlowDot = (
      x: number,
      y: number,
      dotR: number,
      glowR: number,
      color: string
    ) => {
      const glowMap: Record<string, string> = {
        "#EA580C": "rgba(234,88,12,",
        "#F97316": "rgba(249,115,22,",
        "#FB923C": "rgba(251,146,60,",
        "#FDBA74": "rgba(196,181,253,",
      };
      const base = glowMap[color] || "rgba(234,88,12,";

      const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR);
      grd.addColorStop(0, base + "0.6)");
      grd.addColorStop(0.5, base + "0.15)");
      grd.addColorStop(1, base + "0)");
      ctx.beginPath();
      ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Inner highlight
      ctx.beginPath();
      ctx.arc(x - dotR * 0.25, y - dotR * 0.25, dotR * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fill();
    };

    // --- Main Loop ---
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Central nebula glow
      const nebula = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      nebula.addColorStop(0, "rgba(234,88,12,0.08)");
      nebula.addColorStop(0.4, "rgba(194,65,12,0.04)");
      nebula.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, W, H);

      // Orbit rings
      drawRing(62, 0.45, []);
      drawRing(110, 0.3, []);
      drawRing(158, 0.2, []);
      drawRing(202, 0.12, []);

      // Ambient particles
      t++;
      particles.forEach((p) => {
        p.x += p.speed;
        p.y += p.dy;
        p.pulse += 0.018;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        // Container wrapping boundaries
        if (p.x > W + 20) p.x = -20;
        if (p.x < -20) p.x = W + 20;
        if (p.y > H + 20) p.y = -20;
        if (p.y < -20) p.y = H + 20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,146,60,${alpha})`;
        ctx.fill();
      });

      // Constellation connections
      const positions = orbits.map((orb) => getOrbitalPos(orb, t));

      constellations.forEach(([a, b]) => {
        const pa = positions[a],
          pb = positions[b];
        const dx = pb.x - pa.x,
          dy = pb.y - pa.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 0.18 - dist / 1200);
        if (alpha > 0.01) {
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `rgba(251,146,60,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Orbital planetary nodes
      orbits.forEach((orb, i) => {
        const pos = positions[i];
        drawGlowDot(pos.x, pos.y, orb.dotR, orb.glowR, orb.dotColor);
      });

      // Central core rendering
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38);
      coreGlow.addColorStop(0, "rgba(234,88,12,0.35)");
      coreGlow.addColorStop(0.5, "rgba(194,65,12,0.12)");
      coreGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251,146,60,0.6)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      const coreDot = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, 18);
      coreDot.addColorStop(0, "#FDBA74");
      coreDot.addColorStop(0.4, "#EA580C");
      coreDot.addColorStop(1, "#7C2D12");
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = coreDot;
      ctx.fill();

      // M logo typography
      ctx.font = "500 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillText("M", cx, cy);

      // Tick marks on outer ring
      const tickCount = 24;
      for (let i = 0; i < tickCount; i++) {
        const angle = (i / tickCount) * Math.PI * 2;
        const innerR = 197;
        const outerR = i % 6 === 0 ? 207 : 202;
        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR * 0.38;
        const x2 = cx + Math.cos(angle) * outerR;
        const y2 = cy + Math.sin(angle) * outerR * 0.38;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle =
          i % 6 === 0 ? "rgba(251,146,60,0.5)" : "rgba(234,88,12,0.25)";
        ctx.lineWidth = i % 6 === 0 ? 1 : 0.5;
        ctx.stroke();
      }

      // Brand Text Label
      // Brand Text Label
      ctx.font = "500 10px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(251,146,60,0.45)";
      ctx.fillText("MADUTEK", cx, H - 24);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup listeners and render loops on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-[420px]" />
    </div>
  );
}
