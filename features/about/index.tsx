"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, Heart, TrendingUp, ArrowUpRight } from "lucide-react";
import PageMaxWidth from "@/components/pageMaxWidth";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Shield,
    title: "Quality first",
    description:
      "Every pixel, every line of code crafted with care and attention to detail.",
    accentRgb: "234,88,12",
  },
  {
    icon: Clock,
    title: "On-time delivery",
    description:
      "We respect deadlines. Transparent timelines keep your project on track.",
    accentRgb: "6,182,212",
  },
  {
    icon: Heart,
    title: "Client-centric",
    description:
      "Your success is our success. We treat every project like it's our own.",
    accentRgb: "244,63,94",
  },
  {
    icon: TrendingUp,
    title: "Results-driven",
    description:
      "Beautiful design is just the start. We build sites that drive real outcomes.",
    accentRgb: "16,185,129",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const valueCards = valueRefs.current.filter(Boolean) as HTMLElement[];

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Left column children stagger up ──────────────────────────
        const leftEls = leftRef.current
          ? Array.from(leftRef.current.children)
          : [];

        gsap.fromTo(
          leftEls,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );

        // ── Value cards stagger ─────────────────────────────────────
        gsap.fromTo(
          valueCards,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: valueCards[0],
              start: "top 88%",
              once: true,
            },
          },
        );

        // ── Right: image slides in from right ─────────────────────────
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 60, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 83%",
              once: true,
            },
          },
        );

        // ── Floating badges spring in ─────────────────────────────────
        gsap.fromTo(
          badge1Ref.current,
          { opacity: 0, y: 24, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
            delay: 0.35,
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 83%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          badge2Ref.current,
          { opacity: 0, y: -24, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
            delay: 0.5,
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 83%",
              once: true,
            },
          },
        );

        // ── Idle float loops ──────────────────────────────────────────
        gsap.to(badge1Ref.current, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
        gsap.to(badge2Ref.current, {
          y: 8,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.4,
        });

        // ── Desktop: image parallax + pointer-driven tilt ──────────────
        mm.add("(min-width: 1024px)", () => {
          gsap.to(imgRef.current, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          const frame = frameRef.current;
          if (frame) {
            gsap.set(frame, {
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            });
            const rotX = gsap.quickTo(frame, "rotateX", {
              duration: 0.6,
              ease: "power3",
            });
            const rotY = gsap.quickTo(frame, "rotateY", {
              duration: 0.6,
              ease: "power3",
            });

            const onMove = (e: MouseEvent) => {
              const rect = frame.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width - 0.5;
              const py = (e.clientY - rect.top) / rect.height - 0.5;
              rotY(px * 8);
              rotX(-py * 8);
            };
            const onLeave = () => {
              rotX(0);
              rotY(0);
            };

            frame.addEventListener("mousemove", onMove);
            frame.addEventListener("mouseleave", onLeave);

            return () => {
              frame.removeEventListener("mousemove", onMove);
              frame.removeEventListener("mouseleave", onLeave);
            };
          }
        });

        // ── Value cards: pointer-tracking glow + icon lift ─────────────
        mm.add("(min-width: 768px)", () => {
          const cleanups: Array<() => void> = [];

          valueCards.forEach((card, i) => {
            const icon = card.querySelector<HTMLElement>("[data-vicon]");
            const glow = glowRefs.current[i];
            if (!glow) return;

            const moveX = gsap.quickTo(glow, "x", {
              duration: 0.5,
              ease: "power3",
            });
            const moveY = gsap.quickTo(glow, "y", {
              duration: 0.5,
              ease: "power3",
            });

            const tl = gsap.timeline({
              paused: true,
              defaults: { ease: "power2.out" },
            });
            tl.to(glow, { opacity: 1, duration: 0.35 }, 0);
            if (icon)
              tl.to(icon, { y: -2, rotate: -6, scale: 1.08, duration: 0.3 }, 0);

            const onEnter = () => tl.play();
            const onLeave = () => tl.reverse();
            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              moveX(e.clientX - rect.left);
              moveY(e.clientY - rect.top);
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
      id="about"
      className="relative py-28 sm:py-36 bg-medium-section text-medium-section-foreground overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-orange-600/[0.08] blur-[120px] top-0 -left-32" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-cyan-500/[0.05] blur-[100px] bottom-0 right-0" />
      </div>

      <PageMaxWidth>
        <div className="max-w-[1280px] mx-auto px-6 xl:px-10">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            {/* ── Left ─────────────────────────────────────────────── */}
            <div ref={leftRef} className="flex flex-col">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-[13px] font-medium text-orange-300">
                  About us
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-clash-grotesk uppercase text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.08] tracking-[-0.025em] text-medium-section-foreground mb-6">
                Small team,
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--hero-gradient)" }}
                >
                  outsized impact.
                </span>
              </h2>

              {/* Body */}
              <div className="flex flex-col gap-4 mb-10">
                <p className="text-[14.5px] leading-[1.8] text-medium-section-muted">
                  We&apos;re a tight-knit team of designers and developers who
                  believe great websites shouldn&apos;t require a massive agency
                  price tag. Big-agency quality with the personal touch of a
                  boutique studio.
                </p>

                <p className="text-[14px] leading-[1.8] text-medium-section-muted/75">
                  Every client gets direct access to senior talent — no account
                  managers, no handoffs. Just a dedicated team that cares about
                  your project as much as you do.
                </p>
              </div>

              {/* Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div
                      key={v.title}
                      ref={(el) => {
                        valueRefs.current[i] = el;
                      }}
                      data-value
                      className="group relative flex gap-3.5 items-start rounded-xl border border-medium-section-border bg-medium-section-card p-4 overflow-hidden cursor-default transition-colors duration-300 hover:bg-[#3a302a]"
                      style={{ opacity: 0 }}
                    >
                      {/* Pointer-tracking glow */}
                      <div
                        ref={(el) => {
                          glowRefs.current[i] = el;
                        }}
                        className="absolute w-[160px] h-[160px] rounded-full opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                        style={{
                          background: `radial-gradient(circle, rgba(${v.accentRgb},0.14) 0%, transparent 70%)`,
                          left: 0,
                          top: 0,
                        }}
                      />

                      {/* Icon */}
                      <div
                        data-vicon
                        className="relative z-10 w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `rgba(${v.accentRgb},0.12)`,
                          boxShadow: `0 0 14px rgba(${v.accentRgb},0.18)`,
                        }}
                      >
                        <Icon
                          size={14}
                          style={{ color: `rgb(${v.accentRgb})` }}
                        />
                      </div>

                      {/* Text */}
                      <div className="relative z-10">
                        <div className="text-[13px] font-semibold font-clash-grotesk text-medium-section-foreground mb-1">
                          {v.title}
                        </div>
                        <div className="text-[12px] leading-[1.65] text-medium-section-muted">
                          {v.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right ────────────────────────────────────────────── */}
            <div
              ref={rightRef}
              className="relative hidden lg:block"
              style={{ opacity: 0 }}
            >
              {/* Image with pointer-driven 3D tilt */}
              <div
                ref={frameRef}
                className="relative rounded-2xl overflow-hidden aspect-[4/4] border border-medium-section-border"
              >
                <img
                  ref={imgRef}
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Team collaboration"
                  className="w-full h-full object-cover scale-110"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Hairline inner border for a crafted, framed feel */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>

              {/* Badge 1 — bottom left */}
              <div
                ref={badge1Ref}
                className="absolute -bottom-5 left-6 flex flex-col gap-1 rounded-2xl border border-medium-section-border bg-[#342c27]/90 backdrop-blur-md p-4 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
                style={{ opacity: 0 }}
              >
                <div className="font-clash-grotesk text-[28px] font-bold text-medium-section-foreground leading-none">
                  5<span className="text-orange-400 text-[18px]">+</span>
                </div>
                <div className="text-[11px] text-medium-section-muted leading-snug">
                  Years building
                  <br />
                  digital experiences
                </div>
              </div>

              {/* Badge 2 — top right */}
              <div
                ref={badge2Ref}
                className="absolute -top-5 right-6 flex flex-col gap-1.5 rounded-2xl border border-medium-section-border bg-[#342c27]/90 backdrop-blur-md p-4 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 1l1.4 2.8 3.1.45-2.25 2.19.53 3.1L6 8.1 3.22 9.54l.53-3.1L1.5 4.25l3.1-.45z"
                        fill="#facc15"
                      />
                    </svg>
                  ))}
                </div>
                <div className="text-[11px] text-muted-foreground leading-snug">
                  Rated 5/5 by
                  <br />
                  our clients
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer nudge ─────────────────────────────────────────── */}
          <div className="mt-14 pt-8 border-t border-medium-section-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[13px] text-medium-section-muted max-w-xs">
              Based remotely — working with clients worldwide since 2019.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:opacity-80 transition-opacity duration-200"
            >
              Work with us
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
