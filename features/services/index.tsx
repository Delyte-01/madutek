"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Search,
  Palette,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import PageMaxWidth from "@/components/pageMaxWidth";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Custom Websites",
    description:
      "Bespoke websites built from scratch with modern frameworks — tailored to your brand, wired for performance, built to last.",
    color: "from-violet-500 to-blue-500",
    accent: "#7c3aed",
    accentRgb: "124,58,237",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Online stores that actually sell. Friction-free checkout, smart catalogs, and payment integrations that just work.",
    color: "from-emerald-500 to-teal-500",
    accent: "#10b981",
    accentRgb: "16,185,129",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Pixel-perfect across every screen. Mobile-first layouts that feel native whether you're on a phone, tablet, or 4K display.",
    color: "from-orange-500 to-amber-500",
    accent: "#f97316",
    accentRgb: "249,115,22",
  },
  {
    icon: Search,
    title: "SEO & Performance",
    description:
      "Sub-second load times and technical SEO that gets you found — and keeps visitors around long enough to convert.",
    color: "from-cyan-500 to-sky-500",
    accent: "#06b6d4",
    accentRgb: "6,182,212",
  },
  {
    icon: Palette,
    title: "Brand & UI Design",
    description:
      "Visual identity systems and UI kits that scale. From logo to design tokens, we build the foundation your team ships from.",
    color: "from-rose-500 to-pink-500",
    accent: "#f43f5e",
    accentRgb: "244,63,94",
  },
  {
    icon: Zap,
    title: "Web Applications",
    description:
      "Real-time dashboards, complex workflows, interactive tools. We build web apps that feel as fast as they look.",
    color: "from-violet-500 to-purple-600",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Header reveal ─────────────────────────────────────────────
        const headerEls = headerRef.current
          ? Array.from(headerRef.current.children)
          : [];

        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );

        const cards = gridRef.current
          ? Array.from(gridRef.current.children)
          : [];

        // ── Mobile: simple fade-up ────────────────────────────────────
        mm.add("(max-width: 639px)", () => {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.09,
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 90%",
                once: true,
              },
            }
          );
        });

        // ── Desktop: clip-path wipe + hover interactions ──────────────
        mm.add("(min-width: 640px)", () => {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 44, clipPath: "inset(0 0 100% 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.7,
              ease: "power3.out",
              stagger: { amount: 0.5, grid: [2, 3], from: "start" },
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );

          cards.forEach((card) => {
            const icon = card.querySelector<HTMLElement>("[data-icon]");
            const arrow = card.querySelector<HTMLElement>("[data-arrow]");

            const enter = gsap.timeline({ paused: true });
            if (icon)
              enter.to(
                icon,
                { y: -4, scale: 1.1, duration: 0.3, ease: "power2.out" },
                0
              );
            if (arrow)
              enter.to(
                arrow,
                { opacity: 1, x: 0, y: 0, duration: 0.25, ease: "power2.out" },
                0
              );

            card.addEventListener("mouseenter", () => enter.play());
            card.addEventListener("mouseleave", () => enter.reverse());
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-28 sm:py-36 bg-[#080A12]"
    >
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-600/[0.06] blur-[120px] -bottom-32 -left-32" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[100px] top-0 right-0" />
      </div>

      <PageMaxWidth>
        <div className="max-w-[1280px] mx-auto px-6 xl:px-10">
          {/* ── Header ─────────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16 sm:mb-20"
          >
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-violet-500/60" />
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-violet-400/80">
                  What We Do
                </span>
              </div>

              <h2 className="font-clash-grotesk text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#f0eeff]">
                Every service your
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg,#c4b5fd 0%,#818cf8 50%,#67e8f9 100%)",
                  }}
                >
                  site actually needs.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-[1.8] text-violet-200/40 max-w-[300px] sm:text-right sm:pb-1">
              End-to-end web work — from first sketch to live site and
              everything that keeps it performing after launch.
            </p>
          </div>

          {/* ── Grid ───────────────────────────────────────────────── */}
          {/*
            Gap-px trick: parent gets a subtle bg colour, children sit on top.
            The 1px gaps between children reveal the parent colour = hairline dividers.
          */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/[0.07]"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              const num = String(i + 1).padStart(2, "0");

              return (
                <div
                  key={service.title}
                  className="group relative bg-[#080A12] p-7 sm:p-8 flex flex-col gap-5 cursor-default overflow-hidden"
                >
                  {/* Radial glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 0% 0%, rgba(${service.accentRgb},0.11) 0%, transparent 65%)`,
                    }}
                  />

                  {/* Top row */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div
                      data-icon
                      className={`w-10 h-10 rounded-[10px] bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}
                      style={{
                        boxShadow: `0 0 20px rgba(${service.accentRgb},0.28)`,
                      }}
                    >
                      <Icon size={17} className="text-white" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-clash-grotesk text-[11px] tabular-nums"
                        style={{ color: `rgba(${service.accentRgb},0.4)` }}
                      >
                        {num}
                      </span>
                      <div
                        data-arrow
                        className="w-5 h-5 rounded-full border border-white/[0.08] flex items-center justify-center opacity-0 translate-x-1 -translate-y-1"
                      >
                        <ArrowUpRight size={10} className="text-white/40" />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="relative z-10 flex flex-col gap-2">
                    <h3 className="font-clash-grotesk text-[17px] font-semibold tracking-[-0.01em] text-[#e9e3ff] group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[13px] leading-[1.75] text-violet-200/38 group-hover:text-violet-200/55 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent line — CSS width transition, no GSAP needed */}
                  <div className="relative z-10 mt-auto pt-5 border-t border-white/[0.05]">
                    <div
                      className="h-px w-0 group-hover:w-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        background: `linear-gradient(90deg, rgba(${service.accentRgb},0.9), transparent)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Footer nudge ─────────────────────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-9 border-t border-white/[0.06]">
            <p className="text-[13px] text-violet-200/30 max-w-xs">
              Not sure what you need? We&apos;ll help you figure it out — no pitch,
              no pressure.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-violet-300/70 hover:text-violet-200 transition-colors duration-200"
            >
              Talk to us about your project
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </PageMaxWidth>
    </section>
  );
}
