"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ---------- Types ---------- */
interface Testimonial {
  name: string;
  role: string;
  content: string;
  value: number; // number the metric counts up to
  suffix: string; // "%", "×", "K+"
  metricLabel: string;
}

/* ---------- Data ---------- */
const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Meridian Finance",
    content:
      "MaduTek completely transformed our online presence. The website they built not only looks incredible but has increased our lead generation by 340%. The team was responsive, creative, and truly understood our vision.",
    value: 340,
    suffix: "%",
    metricLabel: "Lead growth",
  },
  {
    name: "James Whitfield",
    role: "Founder, Verdant Studio",
    content:
      "Working with MaduTek was a game-changer. They delivered a site that perfectly captures our architectural aesthetic. The attention to detail in the animations and image galleries is unreal. Best investment we made.",
    value: 12,
    suffix: "×",
    metricLabel: "ROI achieved",
  },
  {
    name: "Priya Desai",
    role: "Marketing Director, Nourish Kitchen",
    content:
      "From the first call to launch, the process was seamless. Our new site handles thousands of orders daily without a hiccup. The team even helped us integrate our delivery logistics. Absolutely top-notch.",
    value: 10,
    suffix: "K+",
    metricLabel: "Daily orders",
  },
];

const marqueeWords = [
  "Trusted",
  "Design",
  "Strategy",
  "Results",
  "Creative",
  "Growth",
  "Built with MaduTek",
];

const bodyFont = "font-['Helvetica_Neue',Helvetica,Arial,sans-serif]";

/* ---------- Pieces ---------- */
function StarRating() {
  return (
    <div className="mb-6 flex gap-1" aria-label="5 out of 5 stars" role="img">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 12 12" aria-hidden>
          <path
            d="M6 1L7.34 4.26L10.9 4.64L8.35 6.97L9.12 10.46L6 8.6L2.88 10.46L3.65 6.97L1.1 4.64L4.66 4.26L6 1Z"
            fill="#E8C840"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, wide }: { t: Testimonial; wide?: boolean }) {
  // Cursor-following spotlight (pure CSS variables, no re-renders)
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <article
      onPointerMove={onMove}
      className={`testimonial-card group relative flex flex-col overflow-hidden bg-[var(--card)] p-7 sm:p-10 ${
        wide ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(140,110,255,0.10), transparent 65%)",
        }}
      />

      {/* Animated top accent line */}
      <div
        aria-hidden
        className="card-line absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-[#b08eff] to-[#6ee7f7]"
      />

      {/* Oversized quote mark */}
      <svg
        aria-hidden
        width="44"
        height="34"
        viewBox="0 0 44 34"
        className="absolute right-7 top-9 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.16] sm:right-10 sm:top-11"
      >
        <path
          d="M0 34V19.5C0 8.2 5.6 1.6 16.8 0l1.6 4.6C12.6 6.2 10 9.6 9.8 14.4H18V34H0Zm26 0V19.5C26 8.2 31.6 1.6 42.8 0l1.2 4.6c-5.6 1.6-8.2 5-8.4 9.8H44V34H26Z"
          fill="url(#qg)"
        />
        <defs>
          <linearGradient id="qg" x1="0" y1="0" x2="44" y2="34">
            <stop stopColor="#b08eff" />
            <stop offset="1" stopColor="#6ee7f7" />
          </linearGradient>
        </defs>
      </svg>

      <StarRating />

      <blockquote
        className={`${bodyFont} relative m-0 mb-10 flex-1 p-0 text-[15px] font-light leading-[1.8] tracking-[0.005em] text-[var(--muted-foreground)] sm:text-base`}
      >
        {t.content}
      </blockquote>

      <div className="mb-7 h-px w-full bg-[var(--border)]" />

      <footer className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
        <div className="flex min-w-0 items-center gap-3.5">
          <div
            className={`${bodyFont} flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b08eff]/25 bg-gradient-to-br from-[#b08eff]/15 to-[#6ee7f7]/10 text-xs font-medium tracking-wide text-[#b08eff] transition-transform duration-300 group-hover:scale-110`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div
              className={`${bodyFont} mb-0.5 text-sm font-medium text-[var(--foreground)]`}
            >
              {t.name}
            </div>
            <div
              className={`${bodyFont} text-xs leading-snug text-[var(--muted-foreground)]`}
            >
              {t.role}
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div
            className={`${bodyFont} card-metric bg-gradient-to-r from-[#b08eff] to-[#6ee7f7] bg-clip-text text-[32px] font-bold leading-none tracking-tight text-transparent tabular-nums sm:text-[36px]`}
            data-value={t.value}
            data-suffix={t.suffix}
          >
            {t.value}
            {t.suffix}
          </div>
          <div
            className={`${bodyFont} mt-1.5 text-xs text-[var(--muted-foreground)]`}
          >
            {t.metricLabel}
          </div>
        </div>
      </footer>
    </article>
  );
}

/* ---------- Main ---------- */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const gradientWordRef = useRef<HTMLSpanElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only animate when the visitor hasn't asked for reduced motion.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        };

        /* Header: one orchestrated reveal */
        const header = gsap.timeline({ scrollTrigger: trigger });

        header.fromTo(
          eyebrowRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out" },
        );

        if (lineRef.current) {
          split = new SplitText(lineRef.current, { type: "words" });
          header.fromTo(
            split.words,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.07,
            },
            0.15,
          );
        }

        header.fromTo(
          gradientWordRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
          0.4,
        );

        header.fromTo(
          subRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.6,
        );

        /* Cards */
        const cards = gsap.utils.toArray<HTMLElement>(
          ".testimonial-card",
          gridRef.current,
        );

        cards.forEach((card, i) => {
          const line = card.querySelector(".card-line");
          const metric = card.querySelector<HTMLElement>(".card-metric");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: (i % 3) * 0.1,
          });

          tl.fromTo(
            card,
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          ).fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
            "-=0.5",
          );

          if (metric) {
            const end = Number(metric.dataset.value);
            const suffix = metric.dataset.suffix ?? "";
            const counter = { v: 0 };
            metric.textContent = `0${suffix}`;
            tl.to(
              counter,
              {
                v: end,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  metric.textContent = `${Math.round(counter.v)}${suffix}`;
                },
              },
              "-=0.5",
            );
          }
        });

        /* Marquee: two identical halves, so -50% loops seamlessly */
        if (marqueeRef.current) {
          gsap.to(marqueeRef.current, {
            xPercent: -50,
            duration: 30,
            ease: "none",
            repeat: -1,
          });
        }
      });
    }, sectionRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  const track = [...marqueeWords, ...marqueeWords];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-40"
      aria-labelledby="testimonials-heading"
    >
      {/* Top hairline */}
      <div className="absolute left-[6%] right-[6%] top-0 h-px bg-[var(--border)]" />

      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] top-[8%] h-[70vw] max-h-[600px] w-[70vw] max-w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(110,90,210,0.09) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] bottom-[12%] h-[60vw] max-h-[500px] w-[60vw] max-w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(110,210,200,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div
            ref={eyebrowRef}
            className="mb-6 inline-flex items-center gap-3 sm:mb-7"
          >
            <span className="inline-block h-px w-6 bg-gradient-to-r from-[#b08eff] to-[#6ee7f7]" />
            <span
              className={`${bodyFont} text-xs tracking-[0.14em] text-[#b08eff]`}
            >
              Client voices
            </span>
          </div>

          <div className="overflow-hidden ">
            <h2
              id="testimonials-heading"
              className="font-clash-grotesk  text-[clamp(38px,7vw,76px)] font-medium uppercase leading-[1.15] tracking-tight text-[var(--foreground)]"
            >
              <span ref={lineRef} className="inline-block">
                Proof in every
              </span>
              <br />
              <span
                ref={gradientWordRef}
                className="inline-block bg-gradient-to-r from-[#b08eff] to-[#6ee7f7] bg-clip-text  text-transparent"
              >
                partnership.
              </span>
            </h2>
          </div>

          <p
            ref={subRef}
            className={`${bodyFont} mt-3 max-w-[400px] text-[15px] font-light leading-[1.7] text-[var(--muted-foreground)] 1sm:text-base`}
          >
            Real outcomes from real founders. No filler, just results that speak
            for themselves.
          </p>
        </div>

        {/* Cards: 1 col mobile, 2 col tablet (last card spans), 3 col desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              t={t}
              wide={i === testimonials.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Marquee with faded edges */}
      <div
        aria-hidden
        className="mt-16 overflow-hidden border-y border-[var(--border)] py-5 sm:mt-24 lg:mt-28"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div
          ref={marqueeRef}
          className="flex w-max items-center will-change-transform"
        >
          {track.map((word, i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span
                className={`${bodyFont} whitespace-nowrap px-5 text-xs tracking-[0.14em] text-[var(--muted-foreground)] sm:px-7 sm:text-[13px]`}
              >
                {word}
              </span>
              <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#b08eff] to-[#6ee7f7]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
