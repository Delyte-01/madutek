"use client"
import { useState, useRef, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Send, Mail, MapPin, Phone, ArrowUpRight, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type ServiceOption =
  | "custom"
  | "ecommerce"
  | "webapp"
  | "redesign"
  | "other"
  | "";

interface FormState {
  name: string;
  email: string;
  company: string;
  service: ServiceOption;
  details: string;
}

const TIMELINE_STEPS = [
  { label: "Discovery & Quote", time: "1–2 days", index: "01" },
  { label: "Design Phase", time: "1–2 weeks", index: "02" },
  { label: "Development", time: "2–4 weeks", index: "03" },
  { label: "Launch", time: "1–2 days", index: "04" },
] as const;

const CONTACT_ITEMS = [
  { Icon: Mail, label: "Email", value: "hello@forgestudio.dev" },
  { Icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
  { Icon: MapPin, label: "Location", value: "Remote-first, worldwide" },
] as const;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLButtonElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Animate out form before showing success
    gsap.to(formColRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setSubmitted(true),
    });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Custom cursor (desktop only) ──────────────────────────────────
      mm.add("(hover: hover)", () => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const move = (e: MouseEvent) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: "power3.out",
          });
        };

        const enter = () =>
          gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        const leave = () =>
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });

        window.addEventListener("mousemove", move);
        sectionRef.current?.addEventListener("mouseenter", enter);
        sectionRef.current?.addEventListener("mouseleave", leave);

        return () => {
          window.removeEventListener("mousemove", move);
        };
      });

      // ── Magnetic button (desktop only) ────────────────────────────────
      mm.add("(hover: hover)", () => {
        const btn = magnetRef.current;
        if (!btn) return;

        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) * 0.35;
          const dy = (e.clientY - cy) * 0.35;
          gsap.to(btn, { x: dx, y: dy, duration: 0.5, ease: "power3.out" });
        };

        const onLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1.2, 0.4)",
          });
        };

        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);

        return () => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
        };
      });

      // ── Eyebrow line draw ─────────────────────────────────────────────
      gsap.fromTo(
        markerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // ── Heading SplitText ─────────────────────────────────────────────
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, {
          type: "lines,words",
        });

        gsap.fromTo(
          split.words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 82%",
            },
          }
        );

        return () => split.revert();
      }
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      // ── Sub-paragraph ─────────────────────────────────────────────────
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subRef.current,
            start: "top 85%",
          },
        }
      );

      // ── Form column stagger ───────────────────────────────────────────
      gsap.fromTo(
        formColRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formColRef.current,
            start: "top 80%",
          },
        }
      );

      // ── Info column ───────────────────────────────────────────────────
      gsap.fromTo(
        infoColRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoColRef.current,
            start: "top 80%",
          },
        }
      );

      // ── Timeline items ─────────────────────────────────────────────────
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-item",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Success state animate in
  useGSAP(
    () => {
      if (submitted) {
        gsap.fromTo(
          ".success-card",
          { opacity: 0, scale: 0.92, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }
        );
      }
    },
    { dependencies: [submitted], scope: sectionRef }
  );

  return (
    <>
      {/* Custom cursor blob */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.35) 0%, rgba(109,40,217,0) 70%)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
          mixBlendMode: "screen",
        }}
      />

      <section
        ref={sectionRef}
        id="contact"
        style={{
          position: "relative",
          padding: "120px 0",
          overflow: "hidden",
          background: "#09090b",
        }}
      >
        {/* ── Background atmosphere ─────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {/* purple orb left */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "-10%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          {/* violet orb bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              right: "-5%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          {/* top rule */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)",
            }}
          />
          {/* noise grain */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
              opacity: 0.4,
            }}
          />
        </div>

        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 80px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Section header ──────────────────────────────────────── */}
          <div style={{ marginBottom: 72 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div
                ref={markerRef}
                style={{
                  width: 32,
                  height: 2,
                  background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                  transformOrigin: "left center",
                }}
              />
              <span
                ref={eyebrowRef}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#a78bfa",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Get in touch
              </span>
            </div>

            <div style={{ overflow: "hidden" }}>
              <h2
                ref={headingRef}
                style={{
                  fontSize: "clamp(40px, 6vw, 80px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#fafafa",
                  marginBottom: 24,
                  maxWidth: 700,
                }}
                className="font-clash-grotesk"
              >
                Let&apos;s build something{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  extraordinary.
                </span>
              </h2>
            </div>

            <p
              ref={subRef}
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: "#71717a",
                maxWidth: 480,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Tell us about your project. We&apos;ll respond within 48 hours with a
              tailored proposal — no commitment required.
            </p>
          </div>

          {/* ── Main grid ───────────────────────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "clamp(32px, 5vw, 72px)",
              alignItems: "start",
            }}
          >
            {/* ── Form column ─────────────────────────────────────── */}
            <div ref={formColRef} style={{ opacity: 0 }}>
              {submitted ? (
                <div
                  className="success-card"
                  style={{
                    borderRadius: 24,
                    border: "1px solid rgba(124,58,237,0.25)",
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(9,9,11,0.8) 100%)",
                    backdropFilter: "blur(20px)",
                    padding: "clamp(40px, 6vw, 72px)",
                    textAlign: "center",
                    display: "opacity",
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 28px",
                    }}
                  >
                    <Send size={28} color="#34d399" />
                  </div>
                  <h3
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#fafafa",
                      marginBottom: 12,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    Message sent.
                  </h3>
                  <p
                    style={{
                      color: "#71717a",
                      lineHeight: 1.6,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    We&apos;ll review your project details and be in touch within 48
                    hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {/* Name + Email row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: 16,
                    }}
                  >
                    <FormField
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      focused={focusedField === "name"}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      focused={focusedField === "email"}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Company */}
                  <FormField
                    label="Company"
                    name="company"
                    type="text"
                    placeholder="Company name (optional)"
                    value={form.company}
                    onChange={handleChange}
                    focused={focusedField === "company"}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                  />

                  {/* Service select */}
                  <div>
                    <label style={labelStyle}>What do you need?</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        color: form.service ? "#e4e4e7" : "#52525b",
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2371717a' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                    >
                      <option value="" style={{ background: "#0f0f11" }}>
                        Select a service…
                      </option>
                      <option value="custom" style={{ background: "#0f0f11" }}>
                        Custom Website
                      </option>
                      <option
                        value="ecommerce"
                        style={{ background: "#0f0f11" }}
                      >
                        E-Commerce Store
                      </option>
                      <option value="webapp" style={{ background: "#0f0f11" }}>
                        Web Application
                      </option>
                      <option
                        value="redesign"
                        style={{ background: "#0f0f11" }}
                      >
                        Website Redesign
                      </option>
                      <option value="other" style={{ background: "#0f0f11" }}>
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Project details */}
                  <div>
                    <label style={labelStyle}>Project details</label>
                    <textarea
                      name="details"
                      required
                      rows={5}
                      placeholder="Describe your project, goals, and timeline…"
                      value={form.details}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("details")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle,
                        resize: "none",
                        outline:
                          focusedField === "details"
                            ? "1px solid #7c3aed"
                            : undefined,
                        borderColor:
                          focusedField === "details" ? "#7c3aed" : undefined,
                        boxShadow:
                          focusedField === "details"
                            ? "0 0 0 3px rgba(124,58,237,0.15)"
                            : undefined,
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <div style={{ paddingTop: 4 }}>
                    <button
                      ref={magnetRef}
                      type="submit"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "16px 36px",
                        borderRadius: 100,
                        background:
                          "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 15,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "system-ui, sans-serif",
                        letterSpacing: "-0.01em",
                        boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
                        transition:
                          "box-shadow 0.3s ease, background 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        willChange: "transform",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 12px 48px rgba(124,58,237,0.55)";
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background =
                          "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 8px 32px rgba(124,58,237,0.35)";
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background =
                          "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)";
                      }}
                    >
                      Send message
                      <Send size={15} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Info column ─────────────────────────────────────── */}
            <div
              ref={infoColRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                opacity: 0,
              }}
            >
              {/* Contact info card */}
              <div style={cardStyle}>
                <p style={cardLabelStyle}>Contact</p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {CONTACT_ITEMS.map(({ Icon, label, value }) => (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "center", gap: 14 }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: "rgba(124,58,237,0.12)",
                          border: "1px solid rgba(124,58,237,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} color="#a78bfa" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#52525b",
                            marginBottom: 2,
                            fontFamily: "system-ui, sans-serif",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#d4d4d8",
                            fontFamily: "system-ui, sans-serif",
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline card */}
              <div style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <p style={{ ...cardLabelStyle, margin: 0 }}>
                    Typical timeline
                  </p>
                  <Clock size={14} color="#52525b" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {TIMELINE_STEPS.map((step, i) => (
                    <div
                      key={step.label}
                      className="timeline-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "14px 0",
                        borderBottom:
                          i < TIMELINE_STEPS.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                        opacity: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "#52525b",
                          minWidth: 20,
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {step.index}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: 14,
                          color: "#a1a1aa",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {step.label}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#c4b5fd",
                          background: "rgba(124,58,237,0.12)",
                          padding: "3px 10px",
                          borderRadius: 100,
                          fontFamily: "system-ui, sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {step.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div
                style={{
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, rgba(109,40,217,0.18) 0%, rgba(124,58,237,0.06) 100%)",
                  border: "1px solid rgba(167,139,250,0.2)",
                  padding: 24,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(167,139,250,0.4)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "linear-gradient(135deg, rgba(109,40,217,0.25) 0%, rgba(124,58,237,0.10) 100%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(167,139,250,0.2)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "linear-gradient(135deg, rgba(109,40,217,0.18) 0%, rgba(124,58,237,0.06) 100%)";
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#c4b5fd",
                      marginBottom: 6,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    Free 30-min consultation
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#71717a",
                      lineHeight: 1.6,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    Every project starts with an honest conversation about your
                    goals. No commitment, no pressure.
                  </p>
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(124,58,237,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ArrowUpRight size={16} color="#a78bfa" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Shared styles ──────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "#71717a",
  marginBottom: 8,
  fontFamily: "system-ui, sans-serif",
  letterSpacing: "0.03em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#e4e4e7",
  fontSize: 14,
  fontFamily: "system-ui, sans-serif",
  transition:
    "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  outline: "none",
  boxSizing: "border-box",
};

const cardStyle: React.CSSProperties = {
  borderRadius: 20,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  backdropFilter: "blur(12px)",
  padding: 24,
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#52525b",
  marginBottom: 20,
  fontFamily: "system-ui, sans-serif",
};

// ── FormField sub-component ────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function FormField({
  label,
  name,
  type,
  placeholder,
  required,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
}: FormFieldProps) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          ...inputStyle,
          outline: focused ? "1px solid #7c3aed" : "none",
          borderColor: focused ? "#7c3aed" : "rgba(255,255,255,0.08)",
          background: focused
            ? "rgba(124,58,237,0.06)"
            : "rgba(255,255,255,0.04)",
          boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.15)" : "none",
        }}
      />
    </div>
  );
}
