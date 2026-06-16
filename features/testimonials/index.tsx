"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ---------- Types ---------- */
interface Testimonial {
  name: string;
  role: string;
  content: string;
  metric: string;
  metricLabel: string;
  index: string;
}

interface TestimonialCardProps {
  t: Testimonial;
  cardRef: (el: HTMLDivElement | null) => void;
}

/* ---------- Hook ---------- */
export function useGsap(
  animation: () => void,
  deps: React.DependencyList = []
) {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Create a gsap context scoped to this ref
    const ctx = gsap.context(() => {
      animation();
    }, scope);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
/* ---------- Components ---------- */
function StarRating() {
  return (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="star-icon"
        >
          <path
            d="M6 1L7.34 4.26L10.9 4.64L8.35 6.97L9.12 10.46L6 8.6L2.88 10.46L3.65 6.97L1.1 4.64L4.66 4.26L6 1Z"
            fill="#E8C840"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, cardRef }: TestimonialCardProps) {
  return (
    <div
      ref={cardRef}
      className="testimonial-card"
      style={{
        position: "relative",
        borderRadius: "2px",
        padding: "48px 40px 40px",
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Index */}
      <span
        className="card-index"
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          fontFamily: '"Helvetica Neue", sans-serif',
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.18)",
          fontWeight: 400,
        }}
      >
        {t.index}
      </span>

      {/* Animated border line — top */}
      <div
        className="card-line"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "0%",
          height: "1px",
          background: "linear-gradient(90deg, #b08eff, #6ee7f7)",
        }}
      />

      <StarRating />

      {/* Quote */}
      <blockquote
        className="card-quote"
        style={{
          margin: "0 0 40px",
          padding: 0,
          fontFamily: '"Helvetica Neue", sans-serif',
          fontSize: "15px",
          lineHeight: "1.75",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 300,
          letterSpacing: "0.01em",
          fontStyle: "normal",
        }}
      >
        {t.content}
      </blockquote>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.06)",
          marginBottom: "32px",
        }}
      />

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Avatar */}
          <div
            className="avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(176,142,255,0.12)",
              border: "1px solid rgba(176,142,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: "11px",
              fontWeight: 500,
              color: "#b08eff",
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
          >
            {t.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          <div>
            <div
              style={{
                fontFamily: '"Helvetica Neue", sans-serif',
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                marginBottom: "2px",
                letterSpacing: "0.01em",
              }}
            >
              {t.name}
            </div>
            <div
              style={{
                fontFamily: '"Helvetica Neue", sans-serif',
                fontSize: "11px",
                color: "rgba(255,255,255,0.28)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {t.role}
            </div>
          </div>
        </div>

        {/* Metric */}
        <div style={{ textAlign: "right" }}>
          <div
            className="card-metric"
            style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1,
              marginBottom: "2px",
            }}
          >
            {t.metric}
          </div>
          <div
            style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: "10px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {t.metricLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main ---------- */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGsap(() => {
    // Place your gsap animations here, same as before
    gsap.fromTo(
      eyebrowRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      }
    );

    const split = new SplitText(headingRef.current, { type: "words" });

    gsap.fromTo(
      split.words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      }
    );

    /* ── 3. Subtext fade-slide ── */
    gsap.fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.55,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      }
    );

    /* ── 4. Cards: stagger reveal with border-line wipe ── */
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const line = card.querySelector(".card-line");
      const metric = card.querySelector(".card-metric");
      const avatar = card.querySelector(".avatar");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: i * 0.12,
      });

      /* Card slides up */
      tl.fromTo(
        card,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }
      );

      /* Top-border accent wipe */
      tl.fromTo(
        line,
        { width: "0%" },
        { width: "100%", duration: 0.7, ease: "power2.inOut" },
        "-=0.5"
      );

      /* Metric counter */
      tl.fromTo(
        metric,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.3"
      );

      /* Hover: card border glow */
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          borderColor: "rgba(176,142,255,0.22)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(avatar, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          borderColor: "rgba(255,255,255,0.06)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(avatar, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    /* ── 5. Marquee: infinite horizontal scroll ── */
    const marqueeInner = marqueeRef.current;
    if (marqueeInner) {
      const totalWidth = marqueeInner.scrollWidth / 2;
      gsap.to(marqueeInner, {
        x: -totalWidth,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }

    // ...rest of your gsap animations
  }, []);

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Mitchell",
      role: "CEO, Meridian Finance",
      content:
        "Forge Studio completely transformed our online presence. The website they built not only looks incredible but has increased our lead generation by 340%. The team was responsive, creative, and truly understood our vision.",
      metric: "340%",
      metricLabel: "lead growth",
      index: "01",
    },
    {
      name: "James Whitfield",
      role: "Founder, Verdant Studio",
      content:
        "Working with Forge was a game-changer. They delivered a site that perfectly captures our architectural aesthetic. The attention to detail in the animations and image galleries is unreal. Best investment we made.",
      metric: "12×",
      metricLabel: "ROI achieved",
      index: "02",
    },
    {
      name: "Priya Desai",
      role: "Marketing Director, Nourish Kitchen",
      content:
        "From the first call to launch, the process was seamless. Our new site handles thousands of orders daily without a hiccup. The team even helped us integrate our delivery logistics. Absolutely top-notch.",
      metric: "10K+",
      metricLabel: "daily orders",
      index: "03",
    },
  ];

  const marqueeWords = [
    "Trusted",
    "—",
    "Design",
    "—",
    "Strategy",
    "—",
    "Results",
    "—",
    "Creative",
    "—",
    "Growth",
    "—",
    "Built with Forge",
    "—",
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "140px 0 160px",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Top hairline */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background: "rgba(255,255,255,0.07)",
        }}
      />

      {/* Ambient gradient blob */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-15%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(110,90,210,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(110,210,200,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "80px" }}>
          <div
            ref={eyebrowRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "28px",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "rgba(176,142,255,0.7)",
              }}
            />
            <span
              style={{
                fontFamily: '"Helvetica Neue", sans-serif',
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(176,142,255,0.85)",
                fontWeight: 400,
              }}
            >
              Client Voices
            </span>
          </div>
          <div className="overflow-hidden pb-2">
            <h2
              ref={headingRef}
              className="
      font-clash-grotesk
      text-[clamp(42px,6vw,76px)]
      font-bold
      tracking-tight
      leading-[1.25]
      text-white
      m-0
    "
            >
              Proof in every
              <br />
              <span
                className="
        bg-gradient-to-r from-[#b08eff] to-[#6ee7f7]
        bg-clip-text text-transparent
        inline-block
      "
              >
                partnership.
              </span>
            </h2>
          </div>

          <p
            ref={subRef}
            style={{
              fontFamily: '"Helvetica Neue", sans-serif',
              fontSize: "15px",
              color: "rgba(255,255,255,0.35)",
              margin: "28px 0 0",
              maxWidth: "380px",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Real outcomes from real founders. No filler — just results that
            speak for themselves.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              t={t}
              cardRef={(el) => (cardsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>

      {/* Marquee ticker */}
      <div
        style={{
          marginTop: "100px",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "20px 0",
        }}
      >
        <div
          ref={marqueeRef}
          style={{
            display: "flex",
            gap: "40px",
            willChange: "transform",
            whiteSpace: "nowrap",
          }}
        >
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              style={{
                fontFamily: '"Helvetica Neue", sans-serif',
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:
                  word === "—"
                    ? "rgba(176,142,255,0.35)"
                    : "rgba(255,255,255,0.2)",
                fontWeight: word === "—" ? 300 : 400,
                flexShrink: 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
