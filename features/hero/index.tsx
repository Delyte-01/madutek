"use client";

import PageMaxWidth from "@/components/pageMaxWidth";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mockupWrapRef = useRef<HTMLDivElement>(null);
  const floatCard1Ref = useRef<HTMLDivElement>(null);
  const floatCard2Ref = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Custom easing curves via CustomEase ───────────────────────────
    CustomEase.create("studioEase", "M0,0 C0.16,1 0.3,1 1,1");
    CustomEase.create("revealEase", "M0,0 C0.77,0 0.18,1 1,1");
    CustomEase.create("floatEase", "M0,0 C0.34,1.56 0.64,1 1,1");
    CustomEase.create("curtainEase", "M0,0 C0.85,0 0.15,1 1,1");

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Word-split headline ────────────────────────────────────────
        const h1 = headlineRef.current;
        if (h1) {
          h1.innerHTML = h1.innerHTML
            .split(/<br\s*\/?>/gi)
            .map((line) =>
              line
                .trim()
                .split(/(<[^>]+>.*?<\/[^>]+>|\s+)/)
                .filter(Boolean)
                .map((token) => {
                  if (/^\s+$/.test(token)) return " ";

                  if (token.startsWith("<")) {
                    return token.replace(
                      /^(<[^>]+>)(.*?)(<\/[^>]+>)$/,
                      (_m, open, inner, close) =>
                        `${open}<span class="word-clip" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${inner}</span></span>${close}`,
                    );
                  }

                  return `<span class="word-clip" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${token}</span></span>`;
                })
                .join(""),
            )
            .join("<br/>");
        }

        const wordInners = gsap.utils.toArray<HTMLElement>(".word-inner");

        // ── Master timeline ────────────────────────────────────────────
        const tl = gsap.timeline({ defaults: { ease: "none" } });

        // 1. Curtain wipe
        tl.fromTo(
          curtainRef.current,
          { scaleY: 1, transformOrigin: "top center" },
          { scaleY: 0, duration: 1.1, ease: "curtainEase" },
          0,
        );

        // 2. Ambient glow drifts in while curtain lifts
        tl.fromTo(
          orbRef.current,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.6, ease: "revealEase" },
          0.3,
        );

        // 3. Badge
        tl.fromTo(
          badgeRef.current,
          { y: 24, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "studioEase" },
          0.85,
        );

        // 4. Headline words rise through clip masks
        tl.fromTo(
          wordInners,
          { yPercent: 115, rotateZ: 2, opacity: 0 },
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 0.9,
            stagger: { each: 0.055, ease: "power2.out" },
            ease: "studioEase",
          },
          1.0,
        );

        // 5. Description
        tl.fromTo(
          descRef.current,
          { y: 20, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.75,
            ease: "revealEase",
          },
          1.45,
        );

        // 6. CTA buttons
        tl.fromTo(
          gsap.utils.toArray(ctaRef.current?.children ?? []),
          { scale: 0.85, opacity: 0, y: 12 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "floatEase",
          },
          1.65,
        );

        // 7. Stats row
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "revealEase" },
          1.85,
        );

        // 8. Mockup — slides from right with depth
        tl.fromTo(
          mockupWrapRef.current,
          {
            x: 80,
            opacity: 0,
            rotateY: 8,
            skewY: 1.5,
            scale: 0.95,
            transformOrigin: "right center",
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            skewY: 0,
            scale: 1,
            duration: 1.15,
            ease: "revealEase",
          },
          1.0,
        );

        // 9. Float card bottom
        tl.fromTo(
          floatCard1Ref.current,
          { y: 30, x: -10, opacity: 0, scale: 0.88 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "floatEase",
          },
          1.7,
        );

        // 10. Float card top
        tl.fromTo(
          floatCard2Ref.current,
          { y: -30, x: 10, opacity: 0, scale: 0.88 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "floatEase",
          },
          1.85,
        );

        // 11. Scroll hint
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "revealEase" },
          2.1,
        );

        // ── Idle ambient loops ─────────────────────────────────────────
        gsap.to(orbRef.current, {
          x: 25,
          y: -18,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(mockupWrapRef.current, {
          y: -10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.5,
        });
        gsap.to(floatCard1Ref.current, {
          y: "-=6",
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.8,
        });
        gsap.to(floatCard2Ref.current, {
          y: "+=6",
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3.2,
        });

        // ── Mouse parallax (subtle 3-D tilt on mockup) ────────────────
        const section = sectionRef.current;
        const handleMove = (e: MouseEvent) => {
          if (!section || !mockupWrapRef.current) return;
          const rect = section.getBoundingClientRect();
          const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
          gsap.to(mockupWrapRef.current, {
            rotateX: -dy * 5,
            rotateY: dx * 6,
            x: dx * 12,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        section?.addEventListener("mousemove", handleMove);
        return () => section?.removeEventListener("mousemove", handleMove);
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      style={{ perspective: "1200px" }}
    >
      {/* Full-screen curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-background origin-top pointer-events-none"
      />

      <PageMaxWidth>
        {/* Single soft ambient glow — kept faint for a clean, premium field */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div
            ref={orbRef}
            className="absolute w-[560px] h-[560px] rounded-full blur-[110px] -top-32 -right-20"
            style={{ background: "var(--orb-1)" }}
          />
        </div> */}

        {/* Two-column grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-[1280px] mx-auto px-6 xl:px-10 pt-32 pb-20">
          {/* ── LEFT ── */}
          <div className="flex flex-col">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card mb-7 w-fit opacity-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
                Web Design &amp; Development Agency
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="font-clash-grotesk text-[clamp(45px,5vw,60px)] font-medium uppercase leading-[1.06] tracking-[-0.03em] text-foreground mb-5"
            >
              We craft websites
              <br />
              that convert visitors
            </h1>

            <p
              ref={descRef}
              className="text-base sm:text-[17px] leading-[1.7] text-muted-foreground max-w-[440px] mb-9 opacity-0"
            >
              From concept to launch, we build high-performance websites that
              turn browsers into buyers. Modern design, clean code, real
              results.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-14">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 opacity-0"
                style={{ background: "var(--primary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--primary-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--primary)";
                }}
              >
                Get a Free Quote
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] bg-card border border-border text-foreground text-sm font-medium hover:bg-accent transition-all duration-200 opacity-0"
              >
                View Our Work
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-4 border-t border-border pt-7 opacity-0"
            >
              {[
                { value: "120", suffix: "+", label: "Projects delivered" },
                { value: "98", suffix: "%", label: "Client satisfaction" },
                { value: "5", suffix: "+", label: "Years experience" },
                { value: "48", suffix: "h", label: "Average response" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`${i < 3 ? "border-r border-border" : ""} ${
                    i > 0 ? "pl-5" : ""
                  } pr-5`}
                >
                  <div className="font-clash-grotesk text-[26px] font-bold tracking-tight text-foreground leading-tight">
                    {stat.value}
                    <span className="text-[15px] text-muted-foreground">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Browser mockup with a real image inside ── */}
          <div
            className="hidden lg:flex items-center justify-center relative"
            style={{ perspective: "900px" }}
          >
            <div
              ref={mockupWrapRef}
              className="relative w-full max-w-[560px] opacity-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Float card — top right */}
              <div
                ref={floatCard2Ref}
                className="absolute -top-4 -right-5 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-card border border-border shadow-lg opacity-0"
              >
                <div className="w-8 h-8 rounded-[9px] bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={14} className="text-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-foreground">
                    New project live
                  </span>
                  <span className="text-[9.5px] text-muted-foreground">
                    StyleCo — just launched
                  </span>
                </div>
              </div>

              {/* Browser frame */}
              <div className="relative rounded-2xl border bg-card border-border overflow-hidden shadow-[0_30px_70px_-20px_rgba(31,23,18,0.25)]">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-(--card-2)">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex items-center gap-1.5 bg-card border border-border rounded-[7px] px-3 py-1.25">
                    <span className="text-[10px] text-emerald-500">🔒</span>
                    <span className="text-[11px] text-muted-foreground">
                      madutek.com
                    </span>
                  </div>
                </div>

                {/*
                  HERO IMAGE — swap the src below for your own photo,
                  or drop a local file into /public and point src at
                  it (e.g. src="/images/hero.jpg"). This one is a
                  free-to-use Pexels stock photo.
                */}
                <div className="relative w-full aspect-[4/3]">
                  <img
                    src="https://media.istockphoto.com/id/1061329122/photo/desk-with-computer-and-pen-tablet.jpg?s=612x612&w=0&k=20&c=0F4M2dGCCUM-6sLJI-Q6o6_akR63Xh516JTmrEQ6maQ="
                    alt="MaduTek team collaborating on a client website"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 p-4">
                  {[
                    { v: "120+", l: "Projects" },
                    { v: "98%", l: "Satisfaction" },
                    { v: "5 yrs", l: "Experience" },
                    { v: "48h", l: "Response" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="bg-(--card-2) border border-border rounded-[10px] p-2.5"
                    >
                      <div className="font-clash-grotesk text-[15px] font-bold text-foreground tracking-tight">
                        {s.v}
                      </div>
                      <div className="text-[8.5px] text-muted-foreground mt-0.5">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Float card — bottom left */}
              <div
                ref={floatCard1Ref}
                className="absolute -bottom-4 -left-7 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-card border border-border shadow-lg opacity-0"
              >
                <div className="w-8 h-8 rounded-[9px] bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-emerald-500" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-foreground">
                    Conversion up 34%
                  </span>
                  <span className="text-[9.5px] text-muted-foreground">
                    After redesign — 2 weeks post-launch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 opacity-0"
        >
          <span className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-[18px] h-7 rounded-full border-[1.5px] border-border flex justify-center pt-1">
            <div className="w-[3px] h-1.5 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </PageMaxWidth>
    </section>
  );
}
