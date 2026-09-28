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
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Online stores that actually sell. Friction-free checkout, smart catalogs, and payment integrations that just work.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Pixel-perfect across every screen. Mobile-first layouts that feel native whether you're on a phone, tablet, or 4K display.",
  },
  {
    icon: Search,
    title: "SEO & Performance",
    description:
      "Sub-second load times and technical SEO that gets you found — and keeps visitors around long enough to convert.",
  },
  {
    icon: Palette,
    title: "Brand & UI Design",
    description:
      "Visual identity systems and UI kits that scale. From logo to design tokens, we build the foundation your team ships from.",
  },
  {
    icon: Zap,
    title: "Web Applications",
    description:
      "Real-time dashboards, complex workflows, interactive tools. We build web apps that feel as fast as they look.",
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

        // ── Desktop: clip-path wipe + icon pop + hover interactions ───
        mm.add("(min-width: 640px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          });

          tl.fromTo(
            cards,
            { opacity: 0, y: 44, clipPath: "inset(0 0 100% 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.7,
              ease: "power3.out",
              stagger: { amount: 0.5, grid: [2, 3], from: "start" },
            },
            0
          );

          // Icons pop in a beat after each card lands
          const icons = cards
            .map((c) => c.querySelector("[data-icon]"))
            .filter(Boolean);

          tl.fromTo(
            icons,
            { scale: 0.4, opacity: 0, rotate: -12 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.5,
              ease: "back.out(2.2)",
              stagger: { amount: 0.5, grid: [2, 3], from: "start" },
            },
            0.2
          );

          // Per-card hover micro-interactions
          cards.forEach((card) => {
            const icon = card.querySelector<HTMLElement>("[data-icon]");
            const arrow = card.querySelector<HTMLElement>("[data-arrow]");
            const glow = card.querySelector<HTMLElement>("[data-glow]");
            const line = card.querySelector<HTMLElement>("[data-line]");

            const enter = gsap.timeline({ paused: true });
            if (icon)
              enter.to(
                icon,
                { y: -4, scale: 1.08, duration: 0.35, ease: "power2.out" },
                0
              );
            if (arrow)
              enter.to(
                arrow,
                { opacity: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" },
                0
              );
            if (glow)
              enter.to(glow, { opacity: 1, duration: 0.45, ease: "power1.out" }, 0);
            if (line)
              enter.to(
                line,
                { width: "100%", duration: 0.5, ease: "power2.out" },
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
      className="relative py-28 sm:py-36 bg-dark-section text-dark-section-foreground"
    >
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-dark-section-border to-transparent" />

      {/* Single soft ambient glow — kept faint for a clean, premium field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[120px] -bottom-32 -left-32" />
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
                <div className="h-px w-8 bg-primary/60" />
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary">
                  What We Do
                </span>
              </div>

              <h2 className="font-clash-grotesk uppercase text-[clamp(30px,4.5vw,52px)] font-medium leading-[1] text-dark-section-foreground">
                Every service your
                <br />
                site actually needs.
              </h2>
            </div>

            <p className="text-[14px] leading-[1.8] text-dark-section-muted max-w-[300px] sm:text-right sm:pb-1">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden "
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              const num = String(i + 1).padStart(2, "0");

              return (
                <div
                  key={service.title}
                  className="group relative bg-card p-7 sm:p-8 flex flex-col gap-5 cursor-default overflow-hidden  rounded-2xl shadow-md border "
                >
                  {/* Radial glow on hover */}
                  <div
                    data-glow
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 0% 0%, rgba(234,88,12,0.08) 0%, transparent 65%)",
                    }}
                  />

                  {/* Top row */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div
                      data-icon
                      className="w-10 h-10 rounded-[10px] bg-primary flex items-center justify-center flex-shrink-0"
                    >
                      <Icon size={17} className="text-white" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-clash-grotesk text-[11px] tabular-nums text-muted-foreground">
                        {num}
                      </span>
                      <div
                        data-arrow
                        className="w-5 h-5 rounded-full border border-border flex items-center justify-center opacity-0 translate-x-1 -translate-y-1"
                      >
                        <ArrowUpRight
                          size={10}
                          className="text-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="relative z-10 flex flex-col gap-2">
                    <h3 className="font-clash-grotesk text-[17px] font-semibold tracking-[-0.01em] text-foreground transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[13px] leading-[1.75] text-muted-foreground transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom accent line — GSAP-driven width on hover */}
                  <div className="relative z-10 mt-auto pt-5 border-t border-border">
                    <div
                      data-line
                      className="h-px w-0 rounded-full bg-primary"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Footer nudge ─────────────────────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-9 border-t border-border">
            <p className="text-[13px] text-dark-section-muted max-w-xs">
              Not sure what you need? We&apos;ll help you figure it out — no
              pitch, no pressure.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:opacity-80 transition-opacity duration-200"
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