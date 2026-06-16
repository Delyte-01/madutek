"use client";

import PageMaxWidth from "@/components/pageMaxWidth";
import { ArrowRight, ArrowUpRight, CheckCircle, Star } from "lucide-react";
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
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Custom easing curves via CustomEase ───────────────────────────
    // Mechanical snap — letters/words arriving with authority
    CustomEase.create("studioEase", "M0,0 C0.16,1 0.3,1 1,1");
    // Heavy decelerate — large elements settling
    CustomEase.create("revealEase", "M0,0 C0.77,0 0.18,1 1,1");
    // Elastic float — small UI cards bouncing into place
    CustomEase.create("floatEase", "M0,0 C0.34,1.56 0.64,1 1,1");
    // Ultra-tight panel wipe
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

                  // ── Gradient span — animate the whole thing, don't split inside ──
                  if (
                    token.includes("bg-clip-text") ||
                    token.includes("text-transparent")
                  ) {
                    return `<span class="word-clip" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${token}</span></span>`;
                  }

                  if (token.startsWith("<")) {
                    return token.replace(
                      /^(<[^>]+>)(.*?)(<\/[^>]+>)$/,
                      (_m, open, inner, close) =>
                        `${open}<span class="word-clip" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${inner}</span></span>${close}`
                    );
                  }

                  return `<span class="word-clip" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${token}</span></span>`;
                })
                .join("")
            )
            .join("<br/>");
        }

        const wordInners = gsap.utils.toArray<HTMLElement>(".word-inner");

        // ── Master timeline ────────────────────────────────────────────
        const tl = gsap.timeline({ defaults: { ease: "none" } });

        // 1. Curtain wipe — panel slides up & disappears
        tl.fromTo(
          curtainRef.current,
          { scaleY: 1, transformOrigin: "top center" },
          { scaleY: 0, duration: 1.1, ease: "curtainEase" },
          0
        );

        // 2. Orbs drift in while curtain lifts
        tl.fromTo(
          [orb1Ref.current, orb2Ref.current, orb3Ref.current],
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.6,
            stagger: 0.15,
            ease: "revealEase",
          },
          0.3
        );

        // 3. Badge — scale + fade from below
        tl.fromTo(
          badgeRef.current,
          { y: 24, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "studioEase" },
          0.85
        );

        // 4. Headline words rise through clip masks — staggered & snappy
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
          1.0
        );

        // 5. Description — clip-path mask reveal
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
          1.45
        );

        // 6. CTA buttons — scale + y stagger
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
          1.65
        );

        // 7. Stats row — fade + y
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "revealEase" },
          1.85
        );

        // 8. Mockup — slides from right with skew + depth
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
          1.0
        );

        // 9. Float card bottom — spring from below
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
          1.7
        );

        // 10. Float card top — spring from above
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
          1.85
        );

        // 11. Scroll hint — last to arrive
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "revealEase" },
          2.1
        );

        // ── Idle ambient loops ─────────────────────────────────────────
        gsap.to(orb1Ref.current, {
          x: 30,
          y: -20,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(orb2Ref.current, {
          x: -20,
          y: 25,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
        gsap.to(orb3Ref.current, {
          x: 15,
          y: -30,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3,
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

        // ── Mouse parallax (3-D tilt on mockup) ───────────────────────
        const section = sectionRef.current;
        const handleMove = (e: MouseEvent) => {
          if (!section || !mockupWrapRef.current) return;
          const rect = section.getBoundingClientRect();
          const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
          gsap.to(mockupWrapRef.current, {
            rotateX: -dy * 6,
            rotateY: dx * 8,
            x: dx * 14,
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
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080A12]"
      style={{ perspective: "1200px" }}
    >
      {/* Full-screen curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-50 bg-[#080A12] origin-top pointer-events-none"
      />

      <PageMaxWidth>
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            ref={orb1Ref}
            className="absolute w-[520px] h-[520px] rounded-full bg-violet-600/18 blur-[90px] -top-20 -left-28"
          />
          <div
            ref={orb2Ref}
            className="absolute w-[340px] h-[340px] rounded-full bg-blue-500/10 blur-[80px] bottom-10 right-16"
          />
          <div
            ref={orb3Ref}
            className="absolute w-[260px] h-[260px] rounded-full bg-purple-600/12 blur-[70px] top-1/2 right-[30%] -translate-y-1/2"
          />
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Two-column grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-[1280px] mx-auto px-6 xl:px-10 pt-32 pb-20">
          {/* ── LEFT ── */}
          <div className="flex flex-col">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-400/30 bg-violet-600/10 backdrop-blur-sm mb-7 w-fit opacity-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_6px_#8b5cf6]" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-violet-300">
                Web Design &amp; Development Agency
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="font-clash-grotesk text-[clamp(48px,6vw,72px)] font-bold leading-[1.06] tracking-[-0.03em] text-[#f0eeff] mb-5"
            >
              We craft websites
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #e0d9ff, #a78bfa, #60a5fa)",
                }}
              >
                that convert visitors
              </span>
            </h1>

            <p
              ref={descRef}
              className="text-base sm:text-[17px] leading-[1.7] text-violet-200/50 max-w-[440px] mb-9 opacity-0"
            >
              From concept to launch, we build high-performance websites that
              turn browsers into buyers. Modern design, clean code, real
              results.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-14">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] bg-violet-700 hover:bg-violet-600 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 opacity-0"
              >
                Get a Free Quote
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] bg-white/[0.06] border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-all duration-200 opacity-0"
              >
                View Our Work
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-4 border-t border-white/[0.07] pt-7 opacity-0"
            >
              {[
                { value: "120", suffix: "+", label: "Projects delivered" },
                { value: "98", suffix: "%", label: "Client satisfaction" },
                { value: "5", suffix: "+", label: "Years experience" },
                { value: "48", suffix: "h", label: "Average response" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`${i < 3 ? "border-r border-white/[0.07]" : ""} ${
                    i > 0 ? "pl-5" : ""
                  } pr-5`}
                >
                  <div className="font-clash-grotesk text-[26px] font-bold tracking-tight text-[#e9e3ff] leading-tight">
                    {stat.value}
                    <span className="text-[15px] text-violet-400">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-[11px] text-violet-200/40 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Browser Mockup ── */}
          <div
            className="hidden lg:flex items-center justify-center relative"
            style={{ perspective: "900px" }}
          >
            <div
              ref={mockupWrapRef}
              className="relative w-full max-w-[560px] opacity-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow */}
              <div
                className="absolute -inset-8 rounded-[30px] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(108,60,230,0.22) 0%, transparent 70%)",
                }}
              />

              {/* Float card — top right */}
              <div
                ref={floatCard2Ref}
                className="absolute -top-4 -right-5 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#14102680] border border-white/10 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.4)] opacity-0"
              >
                <div className="w-8 h-8 rounded-[9px] bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <Star size={14} className="text-blue-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-white/85">
                    New project live
                  </span>
                  <span className="text-[9.5px] text-violet-200/45">
                    StyleCo — just launched ✦
                  </span>
                </div>
              </div>

              {/* Browser frame */}
              <div className="relative rounded-2xl border border-white/10 bg-[#12101e] overflow-hidden shadow-[0_0_0_1px_rgba(100,60,200,0.2),0_40px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1730] border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-[7px] px-3 py-[5px]">
                    <span className="text-[10px] text-emerald-400">🔒</span>
                    <span className="text-[11px] text-violet-200/50">
                      studiodrift.co
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center text-[13px] font-bold text-white"
                        style={{
                          background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
                        }}
                      >
                        D
                      </div>
                      <span className="text-[13px] font-semibold text-violet-300 tracking-tight">
                        Drift
                      </span>
                    </div>
                    <div className="flex gap-4">
                      {["Work", "Services", "About"].map((l, i) => (
                        <span
                          key={l}
                          className={`text-[10px] ${
                            i === 0
                              ? "text-violet-200/80"
                              : "text-violet-200/35"
                          }`}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-medium px-3 py-1.5 rounded-[7px] bg-violet-700 text-white">
                      Contact
                    </div>
                  </div>

                  <div
                    className="relative rounded-xl overflow-hidden p-7"
                    style={{
                      background:
                        "linear-gradient(160deg,#0d0b1e 0%,#130f2a 100%)",
                    }}
                  >
                    <div
                      className="absolute w-[180px] h-[180px] rounded-full -top-10 -right-8 pointer-events-none"
                      style={{
                        background: "rgba(99,60,210,0.25)",
                        filter: "blur(50px)",
                      }}
                    />
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-4 h-[1.5px] rounded bg-violet-400" />
                      <span className="text-[9px] font-medium tracking-[0.08em] uppercase text-violet-400">
                        Award-winning studio
                      </span>
                    </div>
                    <h2 className="font-clash-grotesk text-[22px] font-bold leading-[1.1] tracking-[-0.03em] text-[#f0eeff] mb-2.5 relative z-10">
                      We build brands
                      <br />
                      <span
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(120deg,#a78bfa,#60a5fa)",
                        }}
                      >
                        that stick.
                      </span>
                    </h2>
                    <p className="text-[9.5px] leading-[1.65] text-violet-200/45 max-w-[240px] mb-4 relative z-10">
                      Digital experiences that convert browsers into loyal
                      customers. Strategy, design, and code — all under one
                      roof.
                    </p>
                    <div className="flex gap-2 relative z-10">
                      <div className="inline-flex items-center gap-1 text-[9px] font-medium px-3.5 py-1.5 rounded-[8px] bg-violet-700 text-white">
                        Start a project <ArrowRight size={8} />
                      </div>
                      <div className="inline-flex items-center text-[9px] font-medium px-3.5 py-1.5 rounded-[8px] bg-white/[0.06] border border-white/10 text-white/60">
                        See our work
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { v: "120+", l: "Projects" },
                      { v: "98%", l: "Satisfaction" },
                      { v: "5 yrs", l: "Experience" },
                      { v: "48h", l: "Response" },
                    ].map((s) => (
                      <div
                        key={s.l}
                        className="bg-white/[0.03] border border-white/[0.07] rounded-[10px] p-2.5"
                      >
                        <div className="font-clash-grotesk text-[15px] font-bold text-violet-300 tracking-tight">
                          {s.v}
                        </div>
                        <div className="text-[8.5px] text-violet-200/40 mt-0.5">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Float card — bottom left */}
              <div
                ref={floatCard1Ref}
                className="absolute -bottom-4 -left-7 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#14102680] border border-white/10 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.4)] opacity-0"
              >
                <div className="w-8 h-8 rounded-[9px] bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-emerald-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-white/85">
                    Conversion up 34%
                  </span>
                  <span className="text-[9.5px] text-violet-200/45">
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
          <span className="text-[10px] tracking-[0.14em] uppercase text-violet-200/30">
            Scroll
          </span>
          <div className="w-[18px] h-7 rounded-full border-[1.5px] border-violet-200/20 flex justify-center pt-1">
            <div className="w-[3px] h-1.5 rounded-full bg-violet-400 animate-bounce" />
          </div>
        </div>
      </PageMaxWidth>
    </section>
  );
}
