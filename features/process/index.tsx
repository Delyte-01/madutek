"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, PenTool, Code, Rocket } from "lucide-react";
import PageMaxWidth from "@/components/pageMaxWidth";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discover",
    description:
      "A deep-dive into your vision, audience, and business goals — before a single pixel is touched.",
    details: [
      "Stakeholder interviews",
      "Competitive analysis",
      "Goal definition",
    ],
    accentRgb: "124,58,237",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    description:
      "Wireframes and high-fidelity mockups that make your brand feel unmistakable.",
    details: ["Wireframing", "UI design system", "Client review rounds"],
    accentRgb: "6,182,212",
  },
  {
    icon: Code,
    number: "03",
    title: "Develop",
    description:
      "Clean, performant code in modern frameworks. Regular demos keep you in the loop at every step.",
    details: ["Component architecture", "Responsive builds", "QA testing"],
    accentRgb: "16,185,129",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Grow",
    description:
      "Deployment, optimisation, and ongoing support so your site keeps delivering long after go-live.",
    details: ["Performance audit", "SEO setup", "Post-launch support"],
    accentRgb: "249,115,22",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Header ────────────────────────────────────────────────────
        gsap.fromTo(
          Array.from(headerRef.current?.children ?? []),
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 87%",
              once: true,
            },
          }
        );

        // ── Connector line draws left → right ─────────────────────────
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );

        // ── Step cards: stagger up ────────────────────────────────────
        const cards = Array.from(
          stepsRef.current?.querySelectorAll<HTMLElement>("[data-step]") ?? []
        );

        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.13,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );

        // ── Detail bullets stagger in after cards ─────────────────────
        cards.forEach((card) => {
          const bullets = card.querySelectorAll<HTMLElement>("[data-bullet]");
          gsap.fromTo(
            bullets,
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        // ── Hover: icon lift + glow pulse (desktop) ───────────────────
        mm.add("(min-width: 768px)", () => {
          cards.forEach((card) => {
            const icon = card.querySelector<HTMLElement>("[data-icon]");
            const bigNum = card.querySelector<HTMLElement>("[data-bignum]");

            const tl = gsap.timeline({
              paused: true,
              defaults: { ease: "power2.out" },
            });
            if (icon) tl.to(icon, { y: -4, scale: 1.1, duration: 0.3 }, 0);
            if (bigNum) tl.to(bigNum, { opacity: 0.07, duration: 0.35 }, 0);

            card.addEventListener("mouseenter", () => tl.play());
            card.addEventListener("mouseleave", () => tl.reverse());
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
      id="process"
      className="relative py-28 sm:py-36 bg-[#080A12]"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/[0.05] blur-[120px] -top-20 left-1/4" />
      </div>

      <PageMaxWidth>
        <div className="max-w-[1280px] mx-auto px-6 xl:px-10">
          {/* ── Header ───────────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 sm:mb-20"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-violet-500/60" />
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-violet-400/80">
                  How We Work
                </span>
              </div>
              <h2 className="font-clash-grotesk text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#f0eeff]">
                A process built
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg,#c4b5fd 0%,#818cf8 50%,#67e8f9 100%)",
                  }}
                >
                  for results.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-[1.8] text-violet-200/40 max-w-[300px] sm:text-right sm:pb-1">
              Four phases, zero ambiguity. Every project runs through this
              framework — no exceptions.
            </p>
          </div>

          {/* ── Steps ────────────────────────────────────────────────── */}
          <div ref={stepsRef} className="relative">
            {/* Connector line — desktop only, drawn by GSAP */}
            <div
              className="hidden lg:block absolute top-[52px] left-[calc(12.5%)] right-[calc(12.5%)] h-px origin-left"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                ref={lineRef}
                className="absolute inset-0 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg,rgba(124,58,237,0.5),rgba(6,182,212,0.5),rgba(16,185,129,0.5),rgba(249,115,22,0.5))",
                  transform: "scaleX(0)",
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    data-step
                    className="group relative rounded-2xl border border-white/[0.06] bg-[#0d0b1e] p-6 flex flex-col gap-4 cursor-default overflow-hidden"
                    style={{ opacity: 0 }}
                  >
                    {/* Radial hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, rgba(${step.accentRgb},0.1) 0%, transparent 70%)`,
                      }}
                    />

                    {/* Ghost number */}
                    <div
                      data-bignum
                      className="absolute -top-3 -right-1 font-clash-grotesk text-[72px] font-bold leading-none select-none pointer-events-none opacity-[0.03]"
                      style={{ color: `rgb(${step.accentRgb})` }}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      data-icon
                      className="relative z-10 w-10 h-10 rounded-[10px] flex items-center justify-center"
                      style={{
                        background: `rgba(${step.accentRgb},0.12)`,
                        boxShadow: `0 0 18px rgba(${step.accentRgb},0.2)`,
                      }}
                    >
                      <Icon
                        size={17}
                        style={{ color: `rgb(${step.accentRgb})` }}
                      />
                    </div>

                    {/* Step label */}
                    <div className="relative z-10 flex items-center gap-2">
                      <span
                        className="font-clash-grotesk text-[11px] tabular-nums font-medium"
                        style={{ color: `rgba(${step.accentRgb},0.6)` }}
                      >
                        {step.number}
                      </span>
                      <div className="h-px flex-1 bg-white/[0.05]" />
                    </div>

                    {/* Title + description */}
                    <div className="relative z-10 flex flex-col gap-2">
                      <h3 className="font-clash-grotesk text-[17px] font-semibold tracking-[-0.01em] text-[#e9e3ff] group-hover:text-white transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-[12.5px] leading-[1.7] text-violet-200/40">
                        {step.description}
                      </p>
                    </div>

                    {/* Detail bullets */}
                    <ul className="relative z-10 flex flex-col gap-2 pt-4 border-t border-white/[0.05] mt-auto">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          data-bullet
                          className="flex items-center gap-2 text-[11.5px] text-violet-200/35"
                          style={{ opacity: 0 }}
                        >
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{
                              background: `rgba(${step.accentRgb},0.7)`,
                            }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Footer nudge ─────────────────────────────────────────── */}
          <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[13px] text-violet-200/30 max-w-xs">
              Most projects go from kick-off to live in 4–8 weeks, depending on
              scope.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-violet-300/70 hover:text-violet-200 transition-colors duration-200"
            >
              Get a timeline estimate
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 inline-block">
                →
              </span>
            </a>
          </div>
        </div>
      </PageMaxWidth>
    </section>
  );
}
