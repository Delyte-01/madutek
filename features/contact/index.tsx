"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Send, Mail, MapPin, Phone, ArrowUpRight, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ---------- Types ---------- */
type ServiceOption =
  | "custom"
  | "ecommerce"
  | "webapp"
  | "redesign"
  | "other"
  | "";

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: ServiceOption;
  details: string;
}

interface ContactProps {
  /** Image shown to the right of the heading. Put a file in /public and pass its path. */
  imageSrc?: string;
  imageAlt?: string;
  /** Called on submit. Throw to show the error state. Wire this to your API route / email service. */
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

/* ---------- Data ---------- */
const TIMELINE_STEPS = [
  { label: "Discovery & quote", time: "1–2 days", index: "01" },
  { label: "Design phase", time: "1–2 weeks", index: "02" },
  { label: "Development", time: "2–4 weeks", index: "03" },
  { label: "Launch", time: "1–2 days", index: "04" },
] as const;

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "Email",
    value: "sylvamaduneche@gmail.com",
    href: "sylvamaduneche@gmail.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "08103831224",
    href: "tel:08103831224",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Remote-first, worldwide",
    href: undefined,
  },
] as const;

const SERVICES: { value: Exclude<ServiceOption, "">; label: string }[] = [
  { value: "custom", label: "Custom website" },
  { value: "ecommerce", label: "E-commerce store" },
  { value: "webapp", label: "Web application" },
  { value: "redesign", label: "Website redesign" },
  { value: "other", label: "Something else" },
];

/* ---------- Shared classes ---------- */
const bodyFont = "font-['Helvetica_Neue',Helvetica,Arial,sans-serif]";
const gradientText =
  "bg-gradient-to-r from-[#b08eff] to-[#6ee7f7] bg-clip-text text-transparent";
const labelCls = `${bodyFont} mb-2 block text-[13px] font-medium text-[var(--muted-foreground)]`;

const fieldCls = `${bodyFont} h-12 w-full rounded-xl border-[var(--border)] bg-[var(--secondary)] px-4 text-[15px] text-[var(--foreground)] shadow-none transition placeholder:text-[var(--muted-foreground)]/70 focus-visible:border-[#b08eff] focus-visible:bg-[#b08eff]/5 focus-visible:ring-4 focus-visible:ring-[#b08eff]/15`;

const selectItemCls =
  "cursor-pointer rounded-lg py-2.5 text-sm text-[var(--foreground)] focus:bg-[#b08eff]/10 focus:text-[var(--foreground)]";
const cardCls =
  "rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-md sm:p-7";
const cardTitleCls = `${bodyFont} text-[13px] font-semibold text-[var(--foreground)]`;

/* ---------- Component ---------- */
export function Contact({
  imageSrc = "https://images.pexels.com/photos/3184649/pexels-photo-3184649.jpeg",
  imageAlt = "The MaduTek team at work",
  onSubmit,
}: ContactProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const gradientWordRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLButtonElement>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    details: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      // Replace with a real request (e.g. POST /api/contact) via the onSubmit prop.
      if (onSubmit) await onSubmit(form);
      else await new Promise((r) => setTimeout(r, 600));

      gsap.to(formColRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setSubmitted(true);
          setStatus("idle");
        },
      });
    } catch {
      setStatus("error");
    }
  };

  /* ---------- Animations ---------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Cursor glow + magnetic button: precise pointers, motion allowed */
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = sectionRef.current;
          const cursor = cursorRef.current;
          const btn = magnetRef.current;
          const cleanups: (() => void)[] = [];

          if (section && cursor) {
            gsap.set(cursor, { xPercent: -50, yPercent: -50 });
            const qx = gsap.quickTo(cursor, "x", {
              duration: 0.6,
              ease: "power3.out",
            });
            const qy = gsap.quickTo(cursor, "y", {
              duration: 0.6,
              ease: "power3.out",
            });
            const move = (e: PointerEvent) => {
              qx(e.clientX);
              qy(e.clientY);
            };
            const enter = () =>
              gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
            const leave = () =>
              gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });

            section.addEventListener("pointermove", move);
            section.addEventListener("pointerenter", enter);
            section.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              section.removeEventListener("pointermove", move);
              section.removeEventListener("pointerenter", enter);
              section.removeEventListener("pointerleave", leave);
            });
          }

          if (btn) {
            const onMove = (e: PointerEvent) => {
              const r = btn.getBoundingClientRect();
              gsap.to(btn, {
                x: (e.clientX - (r.left + r.width / 2)) * 0.3,
                y: (e.clientY - (r.top + r.height / 2)) * 0.3,
                duration: 0.5,
                ease: "power3.out",
              });
            };
            const onLeave = () =>
              gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1.2, 0.4)",
              });
            btn.addEventListener("pointermove", onMove);
            btn.addEventListener("pointerleave", onLeave);
            cleanups.push(() => {
              btn.removeEventListener("pointermove", onMove);
              btn.removeEventListener("pointerleave", onLeave);
            });
          }

          return () => cleanups.forEach((fn) => fn());
        },
      );

      /* Entrance + scroll motion: skipped entirely for reduced motion,
         so everything stays visible by default. */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | undefined;

        /* Header: one orchestrated reveal */
        const header = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        });

        header.fromTo(
          markerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
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
            0.1,
          );
        }

        header.fromTo(
          gradientWordRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
          0.35,
        );
        header.fromTo(
          subRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.55,
        );

        /* Image: curtain reveal + gentle parallax */
        header.fromTo(
          imageWrapRef.current,
          { clipPath: "inset(100% 0% 0% 0% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.2,
            ease: "power4.inOut",
          },
          0.2,
        );
        header.fromTo(
          badgeRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          1.1,
        );

        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        /* Columns */
        gsap.fromTo(
          formColRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: formColRef.current, start: "top 85%" },
          },
        );
        gsap.fromTo(
          infoColRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: infoColRef.current, start: "top 85%" },
          },
        );

        /* Timeline rows */
        gsap.fromTo(
          ".timeline-item",
          { opacity: 0, x: 16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: ".timeline-card", start: "top 85%" },
          },
        );

        return () => split?.revert();
      });
    },
    { scope: sectionRef },
  );

  /* Success card: bring the column back in */
  useGSAP(
    () => {
      if (!submitted) return;
      gsap.fromTo(
        formColRef.current,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
      );
    },
    { dependencies: [submitted], scope: sectionRef },
  );

  return (
    <>
      {/* Cursor glow (fine pointers only) */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-[120px] w-[120px] scale-0 rounded-full opacity-0 mix-blend-screen [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{
          background:
            "radial-gradient(circle, rgba(140,110,255,0.32) 0%, rgba(140,110,255,0) 70%)",
        }}
      />

      <section
        ref={sectionRef}
        id="contact"
        aria-labelledby="contact-heading"
        className="relative overflow-hidden bg-[var(--background)] py-20 sm:py-28 lg:py-32"
      >
        {/* Atmosphere */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-[10%] top-[8%] h-[70vw] max-h-[600px] w-[70vw] max-w-[600px] rounded-full blur-[60px]"
            style={{
              background:
                "radial-gradient(circle, rgba(110,90,210,0.14) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -right-[5%] bottom-0 h-[60vw] max-h-[500px] w-[60vw] max-w-[500px] rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(110,210,230,0.09) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(176,142,255,0.35) 50%, transparent)",
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </div>

        <div className="relative z-[1] mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
          {/* ── Header: text left, image right ── */}
          <div className="mb-14 grid items-center gap-10 sm:mb-16 lg:mb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-3 sm:mb-7">
                <div
                  ref={markerRef}
                  className="h-0.5 w-8 origin-left bg-gradient-to-r from-[#b08eff] to-[#6ee7f7]"
                />
                <span
                  className={`${bodyFont} text-xs font-medium tracking-[0.14em] text-[#b08eff]`}
                >
                  Get in touch
                </span>
              </div>

              <div className="overflow-hidden pb-2">
                <h2
                  id="contact-heading"
                  className="font-clash-grotesk m-0 max-w-[700px] text-[clamp(38px,6vw,76px)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--foreground)]"
                >
                  <span ref={lineRef} className="block">
                    Let&apos;s build something
                  </span>
                  <span
                    ref={gradientWordRef}
                    className={`inline-block pb-1 ${gradientText}`}
                  >
                    extraordinary.
                  </span>
                </h2>
              </div>

              <p
                ref={subRef}
                className={`${bodyFont} mt-6 max-w-[480px] text-base leading-[1.7] text-[var(--muted-foreground)] sm:text-lg`}
              >
                Tell us about your project. We&apos;ll respond within 48 hours
                with a tailored proposal, no commitment required.
              </p>
            </div>

            {/* Image */}
            <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:ml-auto">
              <div
                ref={imageWrapRef}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] sm:aspect-[16/10] lg:aspect-[4/4]"
              >
                {/* Fallback backdrop, visible if the image is missing */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(176,142,255,0.35), rgba(110,231,247,0.18) 60%, transparent)",
                  }}
                />
                {!imgFailed && (
                  <div
                    ref={imageInnerRef}
                    className="absolute inset-x-0 -top-[8%] h-[116%]"
                  >
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                      onError={() => setImgFailed(true)}
                    />
                  </div>
                )}
                {/* Legibility gradient for the badge */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
                />
              </div>

              <div
                ref={badgeRef}
                className={`${bodyFont} absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-white backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[13px] leading-tight">
                  Taking on new projects
                  <span className="block text-white/60">
                    Replies within 48 hours
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* ── Main grid ── */}
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Form column */}
            <div ref={formColRef} className="min-w-0">
              {submitted ? (
                <div
                  role="status"
                  className="rounded-3xl border border-[#b08eff]/25 p-8 text-center backdrop-blur-md sm:p-14"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(176,142,255,0.10) 0%, rgba(9,9,11,0.6) 100%)",
                  }}
                >
                  <div className="mx-auto mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15">
                    <Send size={28} color="#34d399" />
                  </div>
                  <h3
                    className={`${bodyFont} mb-3 text-2xl font-bold text-[var(--foreground)] sm:text-[28px]`}
                  >
                    Message sent.
                  </h3>
                  <p
                    className={`${bodyFont} mx-auto max-w-sm leading-relaxed text-[var(--muted-foreground)]`}
                  >
                    We&apos;ll review your project details and be in touch
                    within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className={labelCls}>
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={fieldCls}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className={labelCls}>
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={fieldCls}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company" className={labelCls}>
                      Company{" "}
                      <span className="font-normal opacity-70">(optional)</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company name"
                      value={form.company}
                      onChange={handleChange}
                      className={fieldCls}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className={labelCls}>
                      What do you need?
                    </Label>
                    <Select
                      name="service"
                      value={form.service}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          service: value as ServiceOption,
                        }))
                      }
                    >
                      <SelectTrigger
                        id="service"
                        className={`${fieldCls} !h-12 cursor-pointer data-[placeholder]:text-[var(--muted-foreground)]`}
                      >
                        <SelectValue placeholder="Select a service…" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]">
                        {SERVICES.map((s) => (
                          <SelectItem
                            key={s.value}
                            value={s.value}
                            className={selectItemCls}
                          >
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="details" className={labelCls}>
                      Project details
                    </Label>
                    <Textarea
                      id="details"
                      name="details"
                      required
                      rows={5}
                      placeholder="Describe your project, goals, and timeline…"
                      value={form.details}
                      onChange={handleChange}
                      className={`${fieldCls} !h-auto min-h-[140px] resize-none py-3.5`}
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
                    <button
                      ref={magnetRef}
                      type="submit"
                      disabled={status === "sending"}
                      className={`${bodyFont} inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#7c5cff] to-[#4a8cf0] px-9 py-4 text-[15px] font-semibold tracking-tight text-white shadow-[0_8px_32px_rgba(124,92,255,0.35)] transition-shadow duration-300 will-change-transform hover:shadow-[0_12px_48px_rgba(124,92,255,0.55)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b08eff]/40 disabled:opacity-70 sm:w-auto`}
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                      <Send size={15} />
                    </button>

                    {status === "error" && (
                      <p
                        role="alert"
                        className={`${bodyFont} text-sm text-red-400`}
                      >
                        Something went wrong. Please try again, or email us
                        directly.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Info column */}
            <div ref={infoColRef} className="flex min-w-0 flex-col gap-5">
              <div className={cardCls}>
                <p className={`${cardTitleCls} mb-5`}>Contact</p>
                <ul className="m-0 flex list-none flex-col gap-5 p-0">
                  {CONTACT_ITEMS.map(({ Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#b08eff]/20 bg-[#b08eff]/10">
                          <Icon size={16} color="#b08eff" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`${bodyFont} mb-0.5 text-xs text-[var(--muted-foreground)]`}
                          >
                            {label}
                          </div>
                          <div
                            className={`${bodyFont} break-words text-sm text-[var(--foreground)]`}
                          >
                            {value}
                          </div>
                        </div>
                      </>
                    );
                    return (
                      <li key={label}>
                        {href ? (
                          <a
                            href={href}
                            className="flex items-center gap-3.5 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#b08eff]/50"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="flex items-center gap-3.5">
                            {inner}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className={`timeline-card ${cardCls}`}>
                <div className="mb-3 flex items-center justify-between">
                  <p className={cardTitleCls}>Typical timeline</p>
                  <Clock size={14} color="var(--muted-foreground)" />
                </div>
                <ol className="m-0 flex list-none flex-col p-0">
                  {TIMELINE_STEPS.map((step, i) => (
                    <li
                      key={step.label}
                      className={`timeline-item flex items-center gap-3 py-3.5 sm:gap-4 ${
                        i < TIMELINE_STEPS.length - 1
                          ? "border-b border-[var(--border)]"
                          : ""
                      }`}
                    >
                      <span
                        className={`${bodyFont} min-w-5 text-[11px] font-semibold tabular-nums text-[var(--muted-foreground)]`}
                      >
                        {step.index}
                      </span>
                      <span
                        className={`${bodyFont} flex-1 text-sm text-[var(--muted-foreground)]`}
                      >
                        {step.label}
                      </span>
                      <span
                        className={`${bodyFont} whitespace-nowrap rounded-full bg-[#b08eff]/10 px-2.5 py-1 text-xs font-semibold text-[#b08eff] sm:text-[13px]`}
                      >
                        {step.time}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Consultation CTA: real link, keyboard accessible */}
              <a
                href="mailto:madutek@gmail.com?subject=Free%2030-minute%20consultation"
                className="group flex items-start justify-between gap-4 rounded-2xl border border-[#b08eff]/20 p-6 outline-none transition-colors duration-200 hover:border-[#b08eff]/45 focus-visible:ring-2 focus-visible:ring-[#b08eff]/50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(176,142,255,0.14) 0%, rgba(110,231,247,0.04) 100%)",
                }}
              >
                <div>
                  <p
                    className={`${bodyFont} mb-1.5 text-[15px] font-bold text-[var(--foreground)]`}
                  >
                    Free 30-minute consultation
                  </p>
                  <p
                    className={`${bodyFont} text-[13px] leading-relaxed text-[var(--muted-foreground)]`}
                  >
                    Every project starts with an honest conversation about your
                    goals. No commitment, no pressure.
                  </p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#b08eff]/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={16} color="#b08eff" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
