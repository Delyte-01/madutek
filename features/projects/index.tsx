"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import PageMaxWidth from "@/components/pageMaxWidth";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Meridian Finance",
    category: "FinTech Platform",
    year: "2024",
    description:
      "Banking dashboard with real-time analytics and account management for 40k+ users.",
    image:
      "https://images.pexels.com/photos/8373732/pexels-photo-8373732.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["React", "TypeScript", "Tailwind"],
    accentRgb: "124,58,237",
    size: "large",
  },
  {
    title: "Nourish Kitchen",
    category: "Restaurant & Delivery",
    year: "2024",
    description:
      "Restaurant site with online ordering, live reservations, and dynamic menu management.",
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Next.js", "Stripe", "Supabase"],
    accentRgb: "249,115,22",
    size: "small",
  },
  {
    title: "Verdant Studio",
    category: "Architecture Firm",
    year: "2023",
    description:
      "Portfolio showcasing architectural projects with immersive galleries and custom CMS.",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["React", "Framer Motion", "CMS"],
    accentRgb: "16,185,129",
    size: "small",
  },
  {
    title: "Luxe Retail",
    category: "E-Commerce",
    year: "2023",
    description:
      "Premium e-commerce store with smart filtering and seamless checkout flows.",
    image:
      "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Next.js", "Shopify", "Tailwind"],
    accentRgb: "244,63,94",
    size: "large",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

        // ── Cards ─────────────────────────────────────────────────────
        const cards = Array.from(
          gridRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []
        );

        gsap.fromTo(
          cards,
          { opacity: 0, y: 48, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );

        // ── Hover: subtle image scale + arrow nudge only ──────────────
        mm.add("(min-width: 768px)", () => {
          cards.forEach((card) => {
            const img = card.querySelector<HTMLElement>("[data-img]");
            const arrow = card.querySelector<HTMLElement>("[data-arrow]");
            const overlay = card.querySelector<HTMLElement>("[data-overlay]");

            const tl = gsap.timeline({
              paused: true,
              defaults: { ease: "power2.out" },
            });
            if (img) tl.to(img, { scale: 1.05, duration: 0.7 }, 0);
            if (overlay) tl.to(overlay, { opacity: 1, duration: 0.4 }, 0);
            if (arrow)
              tl.to(
                arrow,
                { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.3 },
                0
              );

            card.addEventListener("mouseenter", () => tl.play());
            card.addEventListener("mouseleave", () => tl.reverse());
          });
        });

        // ── Stat counters ─────────────────────────────────────────────
        document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const target = parseInt(el.dataset.count ?? "0", 10);
          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.6,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-28 sm:py-36 bg-[#080A12]"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-700/[0.05] blur-[120px] top-20 -right-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-600/[0.04] blur-[100px] bottom-0 left-0" />
      </div>

      <PageMaxWidth>
        <div className="max-w-[1280px] mx-auto px-6 xl:px-10">
          {/* ── Header ───────────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14 sm:mb-18"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-violet-500/60" />
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-violet-400/80">
                  Our Work
                </span>
              </div>
              <h2 className="font-clash-grotesk text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#f0eeff]">
                Work that earns
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg,#c4b5fd 0%,#818cf8 50%,#67e8f9 100%)",
                  }}
                >
                  its keep.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-8 sm:pb-1">
              {[
                { count: 120, suffix: "+", label: "Projects" },
                { count: 98, suffix: "%", label: "Satisfaction" },
                { count: 5, suffix: " yrs", label: "Experience" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-clash-grotesk text-[26px] font-bold tracking-tight text-[#e9e3ff] leading-none">
                    <span data-count={s.count}>0</span>
                    <span className="text-violet-400 text-[16px]">
                      {s.suffix}
                    </span>
                  </span>
                  <span className="text-[11px] text-violet-200/35 mt-1">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Grid ─────────────────────────────────────────────────── */}
          {/*
            3-col grid. Large cards = col-span-2, small = col-span-1.
            Small cards use flex-col to fill the full row height so they
            don't leave dead space — image grows via flex-1 to match.
          */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => {
              const isLarge = project.size === "large";
              return (
                <div
                  key={project.title}
                  data-card
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.06] bg-[#0d0b1e] flex flex-col ${
                    isLarge ? "md:col-span-2" : "md:col-span-1"
                  }`}
                  style={{ opacity: 0 }}
                >
                  {/* Image — flex-1 so small cards fill row height */}
                  <div className="relative overflow-hidden flex-1 min-h-[200px]">
                    <img
                      data-img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1e] via-[#0d0b1e]/20 to-transparent" />
                    <div
                      data-overlay
                      className="absolute inset-0 opacity-0"
                      style={{
                        background: `linear-gradient(to top, rgba(${project.accentRgb},0.15), transparent 60%)`,
                      }}
                    />
                  </div>

                  {/* Content — fixed height, never grows */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">
                    {/* Meta + arrow */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[10px] font-medium tracking-[0.14em] uppercase"
                          style={{ color: `rgba(${project.accentRgb},0.85)` }}
                        >
                          {project.category}
                        </span>
                        <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                        <span className="text-[10px] text-violet-200/30">
                          {project.year}
                        </span>
                      </div>
                      <div
                        data-arrow
                        className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center opacity-0 translate-x-1.5 -translate-y-1.5 scale-75"
                      >
                        <ArrowUpRight size={12} className="text-white/50" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-clash-grotesk text-[19px] sm:text-[21px] font-bold tracking-[-0.02em] text-[#f0eeff] leading-tight">
                      {project.title}
                    </h3>

                    {/* Description — always visible, compact */}
                    <p className="text-[12.5px] leading-[1.65] text-violet-200/40 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10.5px] px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.03] text-violet-200/45"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Footer CTA ───────────────────────────────────────────── */}
          <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[13px] text-violet-200/30 max-w-xs">
              A handful of what we&apos;ve shipped. Every project built from scratch
              — no templates.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-violet-300/70 hover:text-violet-200 transition-colors duration-200"
            >
              Start your project
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
