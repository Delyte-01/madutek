"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, Heart, TrendingUp } from "lucide-react";
import PageMaxWidth from "@/components/pageMaxWidth";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Every pixel, every line of code crafted with care and attention to detail.",
    accentRgb: "124,58,237",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We respect deadlines. Transparent timelines keep your project on track.",
    accentRgb: "6,182,212",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description:
      "Your success is our success. We treat every project like it's our own.",
    accentRgb: "244,63,94",
  },
  {
    icon: TrendingUp,
    title: "Results-Driven",
    description:
      "Beautiful design is just the start. We build sites that drive real outcomes.",
    accentRgb: "16,185,129",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Left column children stagger up ──────────────────────────
        const leftEls = leftRef.current
          ? Array.from(leftRef.current.children)
          : [];

        gsap.fromTo(
          leftEls,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // ── Value cards stagger ───────────────────────────────────────
        const valueCards = leftRef.current
          ? Array.from(
              leftRef.current.querySelectorAll<HTMLElement>("[data-value]")
            )
          : [];

        gsap.fromTo(
          valueCards,
          { opacity: 0, x: -20 },
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
          }
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
          }
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
          }
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
          }
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

        // ── Image subtle parallax on scroll ───────────────────────────
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
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 sm:py-36 bg-[#080A12]"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/[0.06] blur-[120px] top-0 -left-32" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-cyan-500/[0.04] blur-[100px] bottom-0 right-0" />
      </div>

      <PageMaxWidth>
        <div className="max-w-[1280px] mx-auto px-6 xl:px-10">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            {/* ── Left ─────────────────────────────────────────────── */}
            <div ref={leftRef} className="flex flex-col">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-violet-500/60" />
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-violet-400/80">
                  About Us
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-clash-grotesk text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#f0eeff] mb-6">
                Small team,
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg,#c4b5fd 0%,#818cf8 50%,#67e8f9 100%)",
                  }}
                >
                  outsized impact.
                </span>
              </h2>

              {/* Body */}
              <div className="flex flex-col gap-4 mb-10">
                <p className="text-[14.5px] leading-[1.8] text-violet-200/45">
                  We&apos;re a tight-knit team of designers and developers who
                  believe great websites shouldn&apos;t require a massive agency
                  price tag. Big-agency quality with the personal touch of a
                  boutique studio.
                </p>
                <p className="text-[14px] leading-[1.8] text-violet-200/35">
                  Every client gets direct access to senior talent — no account
                  managers, no handoffs. Just a dedicated team that cares about
                  your project as much as you do.
                </p>
              </div>

              {/* Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {values.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div
                      key={v.title}
                      data-value
                      className="group relative flex gap-3.5 items-start rounded-xl border border-white/[0.06] bg-[#0d0b1e] p-4 overflow-hidden cursor-default"
                      style={{ opacity: 0 }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at 0% 50%, rgba(${v.accentRgb},0.09) 0%, transparent 70%)`,
                        }}
                      />

                      {/* Icon */}
                      <div
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
                        <div className="text-[13px] font-semibold font-clash-grotesk text-[#e9e3ff] mb-1 group-hover:text-white transition-colors duration-300">
                          {v.title}
                        </div>
                        <div className="text-[12px] leading-[1.65] text-violet-200/38">
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
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/[0.07]">
                <img
                  ref={imgRef}
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Team collaboration"
                  className="w-full h-full object-cover scale-110"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A12]/60 via-transparent to-transparent" />
              </div>

              {/* Badge 1 — bottom left */}
              <div
                ref={badge1Ref}
                className="absolute -bottom-5 left-6 flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-[#14102699] backdrop-blur-md p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
                style={{ opacity: 0 }}
              >
                <div className="font-clash-grotesk text-[28px] font-bold text-[#f0eeff] leading-none">
                  5<span className="text-violet-400 text-[18px]">+</span>
                </div>
                <div className="text-[11px] text-violet-200/45 leading-snug">
                  Years building
                  <br />
                  digital experiences
                </div>
              </div>

              {/* Badge 2 — top right */}
              <div
                ref={badge2Ref}
                className="absolute -top-5 right-6 flex flex-col gap-1.5 rounded-2xl border border-white/[0.08] bg-[#14102699] backdrop-blur-md p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
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
                <div className="text-[11px] text-violet-200/45 leading-snug">
                  Rated 5/5 by
                  <br />
                  our clients
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer nudge ─────────────────────────────────────────── */}
          <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[13px] text-violet-200/30 max-w-xs">
              Based remotely — working with clients worldwide since 2019.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-violet-300/70 hover:text-violet-200 transition-colors duration-200"
            >
              Work with us
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
