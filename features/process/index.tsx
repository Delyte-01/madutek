"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageSquare,
  PenTool,
  Code,
  Rocket,
  ArrowUpRight,
} from "lucide-react";
import PageMaxWidth from "@/components/pageMaxWidth";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discover",
    duration: "3–5 days",
    description:
      "A deep-dive into your vision, audience, and business goals — before a single pixel is touched.",
    details: [
      "Stakeholder interviews",
      "Competitive analysis",
      "Goal definition",
    ],
    accentRgb: "234,88,12",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    duration: "1–2 weeks",
    description:
      "Wireframes and high-fidelity mockups that make your brand feel unmistakable.",
    details: ["Wireframing", "UI design system", "Client review rounds"],
    accentRgb: "6,182,212",
  },
  {
    icon: Code,
    number: "03",
    title: "Develop",
    duration: "2–4 weeks",
    description:
      "Clean, performant code in modern frameworks. Regular demos keep you in the loop at every step.",
    details: ["Component architecture", "Responsive builds", "QA testing"],
    accentRgb: "16,185,129",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & grow",
    duration: "Ongoing",
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
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Header ────────────────────────────────────────────────────
        gsap.fromTo(
          Array.from(headerRef.current?.children ?? []),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 87%",
              once: true,
            },
          },
        );

        // ── Cards: mask + subtle 3D drop-in, orchestrated as one wave ──
        gsap.set(cards, {
          transformPerspective: 800,
          transformOrigin: "50% 100%",
        });
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, rotateX: -12, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );

        // ── Detail bullets stagger in after each card lands ────────────
        cards.forEach((card) => {
          const bullets = card.querySelectorAll<HTMLElement>("[data-bullet]");
          gsap.fromTo(
            bullets,
            { opacity: 0, x: -8 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.07,
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            },
          );
        });

        // ── Desktop: scroll-scrubbed connector + active-step highlight ─
        mm.add("(min-width: 1024px)", () => {
          gsap.set(cards, { "--accent-alpha": 0.08 } as gsap.TweenVars);

          const st = ScrollTrigger.create({
            trigger: stepsRef.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.6,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(trackRef.current, { scaleX: progress });
              gsap.set(dotRef.current, {
                left: `${progress * 100}%`,
                opacity: progress > 0.01 && progress < 0.995 ? 1 : 0,
              });

              const activeIndex = Math.min(
                cards.length - 1,
                Math.floor(progress * cards.length),
              );

              cards.forEach((card, i) => {
                const isActive = i === activeIndex;
                gsap.to(card, {
                  "--accent-alpha": isActive ? 0.4 : 0.08,
                  y: isActive ? -4 : 0,
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: "auto",
                } as gsap.TweenVars);
              });
            },
          });

          return () => st.kill();
        });

        // ── Desktop: pointer-tracking glow + icon lift on hover ────────
        mm.add("(min-width: 768px)", () => {
          const cleanups: Array<() => void> = [];

          cards.forEach((card, i) => {
            const icon = card.querySelector<HTMLElement>("[data-icon]");
            const glow = glowRefs.current[i];
            if (!glow) return;

            const moveGlow = gsap.quickTo(glow, "x", {
              duration: 0.5,
              ease: "power3",
            });
            const moveGlowY = gsap.quickTo(glow, "y", {
              duration: 0.5,
              ease: "power3",
            });

            const tl = gsap.timeline({
              paused: true,
              defaults: { ease: "power2.out" },
            });
            tl.to(glow, { opacity: 1, duration: 0.35 }, 0);
            if (icon)
              tl.to(icon, { y: -3, rotate: -6, scale: 1.08, duration: 0.3 }, 0);

            const onEnter = () => tl.play();
            const onLeave = () => tl.reverse();
            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              moveGlow(e.clientX - rect.left);
              moveGlowY(e.clientY - rect.top);
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);
            card.addEventListener("mousemove", onMove);

            cleanups.push(() => {
              card.removeEventListener("mouseenter", onEnter);
              card.removeEventListener("mouseleave", onLeave);
              card.removeEventListener("mousemove", onMove);
            });
          });

          return () => cleanups.forEach((fn) => fn());
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-28 sm:py-36 bg-background overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-orange-600/[0.04] blur-[120px] -top-20 left-1/4" />
      </div>

      <PageMaxWidth>
        <div className="max-w-[1280px] mx-auto px-6 xl:px-10">
          {/* ── Header ───────────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 sm:mb-20"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-[13px] font-medium text-orange-400/90">
                  How we work
                </span>
              </div>
              <h2 className="font-clash-grotesk  uppercase  text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.08] tracking-[-0.025em] text-foreground">
                A process built
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--hero-gradient)" }}
                >
                  for results.
                </span>
              </h2>
            </div>

            <p className="text-[14px] leading-[1.8] text-muted-foreground max-w-[300px] sm:text-right sm:pb-1">
              Four phases, zero ambiguity. Every project runs through this
              framework — no exceptions.
            </p>
          </div>

          {/* ── Steps ────────────────────────────────────────────────── */}
          <div ref={stepsRef} className="relative">
            {/* Connector track — desktop only, filled + traveling dot via scroll scrub */}
            <div
              className="hidden lg:block absolute top-[52px] left-[calc(12.5%)] right-[calc(12.5%)] h-px origin-left"
              style={{ background: "var(--border)" }}
            >
              <div
                ref={trackRef}
                className="absolute inset-0 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg,rgba(234,88,12,0.6),rgba(6,182,212,0.6),rgba(16,185,129,0.6),rgba(249,115,22,0.6))",
                  transform: "scaleX(0)",
                }}
              />
              <div
                ref={dotRef}
                className="absolute -top-[3.5px] w-[8px] h-[8px] rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.5)] -translate-x-1/2 opacity-0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    data-step
                    className="group relative rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 cursor-default overflow-hidden transition-colors duration-300"
                    style={{ opacity: 0, ["--accent-alpha" as string]: 0.08 }}
                  >
                    {/* Pointer-tracking glow */}
                    <div
                      ref={(el) => {
                        glowRefs.current[i] = el;
                      }}
                      className="absolute w-[220px] h-[220px] rounded-full opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                      style={{
                        background: `radial-gradient(circle, rgba(${step.accentRgb},0.16) 0%, transparent 70%)`,
                        left: 0,
                        top: 0,
                      }}
                    />

                    {/* Accent top rule — brightens when this step is "active" on scroll */}
                    <div
                      className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
                      style={{
                        background: `rgba(${step.accentRgb}, var(--accent-alpha))`,
                        transition: "background 0.2s linear",
                      }}
                    />

                    {/* Ghost number */}
                    <div
                      data-bignum
                      className="absolute -top-3 -right-1 font-clash-grotesk text-[72px] font-bold leading-none select-none pointer-events-none opacity-[0.04]"
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

                    {/* Step label + duration */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-clash-grotesk text-[11px] tabular-nums font-medium"
                          style={{ color: `rgba(${step.accentRgb},0.7)` }}
                        >
                          {step.number}
                        </span>
                        <div className="h-px w-4 bg-border" />
                      </div>
                      <span className="text-[10.5px] tabular-nums text-muted-foreground/70">
                        {step.duration}
                      </span>
                    </div>

                    {/* Title + description */}
                    <div className="relative z-10 flex flex-col gap-2">
                      <h3 className="font-clash-grotesk text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-[12.5px] leading-[1.7] text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {/* Detail bullets */}
                    <ul className="relative z-10 flex flex-col gap-2 pt-4 border-t border-border mt-auto">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          data-bullet
                          className="flex items-center gap-2 text-[11.5px] text-muted-foreground"
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
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[13px] text-muted-foreground max-w-xs">
              Most projects go from kick-off to live in 4–8 weeks, depending on
              scope.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:opacity-80 transition-opacity duration-200"
            >
              Get a timeline estimate
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </PageMaxWidth>
    </section>
  );
}
