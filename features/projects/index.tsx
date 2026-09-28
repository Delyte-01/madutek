"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import PageMaxWidth from "@/components/pageMaxWidth";

gsap.registerPlugin(ScrollTrigger);

const featuredProject = {
  title: "Meridian Finance",
  category: "FinTech Platform",
  year: "2024",
  description:
    "A banking dashboard rebuilt from the ground up — real-time analytics, account management, and a design system that scales across 40k+ active users.",
  image:
    "https://images.pexels.com/photos/8373732/pexels-photo-8373732.jpeg?auto=compress&cs=tinysrgb&w=1400",
  tags: ["React", "TypeScript", "Tailwind"],
  metrics: [
    { value: "40k+", label: "Active users" },
    { value: "2.3x", label: "Faster load time" },
    { value: "34%", label: "Support tickets down" },
  ],
};

const projects = [
  {
    title: "Nourish Kitchen",
    category: "Restaurant & Delivery",
    year: "2024",
    description:
      "Online ordering, live reservations, and dynamic menu management for a growing restaurant group.",
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Next.js", "Stripe", "Supabase"],
  },
  {
    title: "Verdant Studio",
    category: "Architecture Firm",
    year: "2023",
    description:
      "Portfolio showcasing architectural projects with immersive galleries and a custom CMS.",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["React", "Framer Motion", "CMS"],
  },
  {
    title: "Luxe Retail",
    category: "E-Commerce",
    year: "2023",
    description:
      "Premium e-commerce store with smart filtering and a seamless, one-page checkout flow.",
    image:
      "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Next.js", "Shopify", "Tailwind"],
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
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
          },
        );

        // ── Featured case study ───────────────────────────────────────
        if (featuredRef.current) {
          const img = featuredRef.current.querySelector("[data-feat-img]");
          const content = featuredRef.current.querySelectorAll(
            "[data-feat-content]",
          );

          const featTl = gsap.timeline({
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 78%",
              once: true,
            },
          });

          featTl
            .fromTo(
              featuredRef.current,
              { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
              {
                opacity: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
                duration: 0.85,
                ease: "power3.out",
              },
              0,
            )
            .fromTo(
              img,
              { scale: 1.15 },
              { scale: 1, duration: 1.4, ease: "power2.out" },
              0,
            )
            .fromTo(
              content,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08,
              },
              0.25,
            );
        }

        // ── Grid cards ────────────────────────────────────────────────
        const cards = Array.from(
          gridRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? [],
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
          },
        );

        // ── Hover interactions (image scale, arrow, accent line) ──────
        mm.add("(min-width: 768px)", () => {
          const allCards = [
            ...(featuredRef.current ? [featuredRef.current] : []),
            ...cards,
          ];

          allCards.forEach((card) => {
            const img = card.querySelector<HTMLElement>(
              "[data-img], [data-feat-img]",
            );
            const arrow = card.querySelector<HTMLElement>("[data-arrow]");
            const line = card.querySelector<HTMLElement>("[data-line]");

            const tl = gsap.timeline({
              paused: true,
              defaults: { ease: "power2.out" },
            });
            if (img) tl.to(img, { scale: 1.06, duration: 0.7 }, 0);
            if (arrow)
              tl.to(
                arrow,
                { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.3 },
                0,
              );
            if (line) tl.to(line, { width: "100%", duration: 0.5 }, 0);

            card.addEventListener("mouseenter", () => tl.play());
            card.addEventListener("mouseleave", () => tl.reverse());
          });
        });

        // ── Stat / metric counters ─────────────────────────────────────
        document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const raw = el.dataset.count ?? "0";
          const target = parseFloat(raw);
          const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;

          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.6,
              ease: "power2.out",
              snap: { innerText: decimals ? 0.1 : 1 },
              onUpdate: function () {
                el.innerText = Number(el.innerText).toFixed(decimals);
              },
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-28 sm:py-36 bg-background"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Single soft ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px] top-20 -right-40" />
      </div>

      <PageMaxWidth>
        <div className="max-w-[1280px] mx-auto px-6 xl:px-10">
          {/* ── Header ───────────────────────────────────────────────── */}
          <div
            ref={headerRef}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14 sm:mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-primary/60" />
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary">
                  Our Work
                </span>
              </div>
              <h2 className="font-clash-grotesk uppercase text-[clamp(30px,4.5vw,52px)] font-medium leading-[1.08] tracking-[-0.025em] text-foreground">
                Work that earns
                <br />
                its keep.
              </h2>
            </div>

            <div className="flex items-center gap-8 sm:pb-1">
              {[
                { count: 120, suffix: "+", label: "Projects" },
                { count: 98, suffix: "%", label: "Satisfaction" },
                { count: 5, suffix: " yrs", label: "Experience" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-clash-grotesk text-[26px] font-bold tracking-tight text-foreground leading-none">
                    <span data-count={s.count}>0</span>
                    <span className="text-primary text-[16px]">{s.suffix}</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-1">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Featured case study — full-width split banner ─────────── */}
          <div
            ref={featuredRef}
            className="group relative rounded-2xl overflow-hidden border border-border bg-card grid grid-cols-1 lg:grid-cols-2 mb-4"
            style={{ opacity: 0 }}
          >
            {/* Image side */}
            <div className="relative min-h-[280px] lg:min-h-[440px] overflow-hidden order-1 lg:order-2">
              <img
                data-feat-img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-5 left-5 lg:hidden inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] uppercase px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-foreground border border-border">
                Featured
              </span>
            </div>

            {/* Content side */}
            <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <div
                data-feat-content
                className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] uppercase px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit mb-6"
              >
                Featured case study
              </div>

              <div data-feat-content className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-primary">
                  {featuredProject.category}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground/40" />
                <span className="text-[11px] text-muted-foreground">
                  {featuredProject.year}
                </span>
              </div>

              <h3
                data-feat-content
                className="font-clash-grotesk text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] text-foreground leading-tight mb-4"
              >
                {featuredProject.title}
              </h3>

              <p
                data-feat-content
                className="text-[14.5px] leading-[1.75] text-muted-foreground max-w-md mb-7"
              >
                {featuredProject.description}
              </p>

              {/* Metrics */}
              <div
                data-feat-content
                className="grid grid-cols-3 gap-4 mb-7 pb-7 border-b border-border max-w-md"
              >
                {featuredProject.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="font-clash-grotesk text-[20px] font-bold text-foreground leading-none">
                      {m.value}
                    </span>
                    <span className="text-[10.5px] text-muted-foreground mt-1.5 leading-snug">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                data-feat-content
                className="flex items-center justify-between"
              >
                <div className="flex flex-wrap gap-1.5">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10.5px] px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  data-arrow
                  className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center flex-shrink-0 opacity-0 translate-x-1.5 -translate-y-1.5 scale-75"
                >
                  <ArrowUpRight size={15} className="text-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Grid — remaining case studies ──────────────────────────── */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.title}
                data-card
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border bg-card flex flex-col"
                style={{ opacity: 0 }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[220px]">
                  <img
                    data-img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-primary">
                        {project.category}
                      </span>
                      <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground/40" />
                      <span className="text-[10px] text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <div
                      data-arrow
                      className="w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center opacity-0 translate-x-1.5 -translate-y-1.5 scale-75 flex-shrink-0"
                    >
                      <ArrowUpRight size={12} className="text-foreground" />
                    </div>
                  </div>

                  <h3 className="font-clash-grotesk text-[19px] font-bold tracking-[-0.02em] text-foreground leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-[12.5px] leading-[1.65] text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10.5px] px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GSAP-driven accent line */}
                  <div className="h-px w-full bg-border mt-1 overflow-hidden">
                    <div data-line className="h-full w-0 bg-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Footer CTA ───────────────────────────────────────────── */}
          <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[13px] text-muted-foreground max-w-xs">
              A handful of what we&apos;ve shipped. Every project built from
              scratch — no templates.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:opacity-80 transition-opacity duration-200"
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
