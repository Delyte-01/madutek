"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Logo from "../logo";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP fullscreen overlay animation
  useGSAP(
    () => {
      if (!menuRef.current) return;

      gsap.set(menuRef.current, { yPercent: -100 });
      gsap.set(linksRef.current, { y: 80, opacity: 0, rotate: 4 });
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      tl.current = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.inOut", duration: 0.9 },
      });

      tl.current
        // 1. Slide the overlay down
        .to(menuRef.current, {
          yPercent: 0,
          force3D: true,
        })
        // 2. Stagger in the nav links
        .to(
          linksRef.current,
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            stagger: 0.08,
            duration: 0.75,
            ease: "power4.out",
          },
          "-=0.5"
        )
        // 3. Draw divider line
        .to(
          dividerRef.current,
          { scaleX: 1, duration: 0.6, ease: "expo.out" },
          "-=0.5"
        )
        // 4. Fade in CTA
        .to(
          ctaRef.current,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.35"
        );
    },
    { scope: container }
  );

  // Play / reverse based on state
  useEffect(() => {
    if (!tl.current) return;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      tl.current.play();
    } else {
      document.body.style.overflow = "";
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div ref={container}>
      {/* ── Fixed header bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[3500] transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl border-b border-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative z-[5000] flex items-center">
            <Logo />
          </a>

          {/* Desktop links — absolutely centred */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest transition-colors duration-200
                  relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
                  after:bg-(--primary) after:transition-all after:duration-300 hover:after:w-full
                  text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
              text-sm font-semibold tracking-wide text-white transition-all duration-200
              hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-600/25"
              style={{ background: "var(--primary)" }}
            >
              Start a Project
            </a>
          </div>

          {/* Hamburger — always on top */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden relative z-[5000] w-12 h-12 flex flex-col justify-center items-center gap-[6px] pointer-events-auto"
          >
            <span
              className={`block w-6 h-[1.5px] bg-foreground transition-all duration-500 ${
                isMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-foreground transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-foreground transition-all duration-500 ${
                isMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* ── Fullscreen mobile overlay ── */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 h-dvh w-full z-[3000] flex flex-col justify-center px-8
          ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ background: "#0A0A0B" }}
      >
        {/* Iron-gold hairline top accent — matches footer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.5) 40%, rgba(249,115,22,0.5) 60%, transparent 100%)",
          }}
        />

        {/* Nav links */}
        <div className="flex flex-col gap-2 mb-10">
          {navLinks.map((link, index) => (
            <div key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                onClick={closeMenu}
                className="block font-black uppercase leading-none tracking-tight
                  text-white hover:text-orange-300 transition-colors duration-200"
                style={{ fontSize: "clamp(2.5rem, 9vw, 5.5rem)" }}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        {/* Animated divider */}
        <div
          ref={dividerRef}
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(249,115,22,0.5) 0%, transparent 100%)",
            marginBottom: "2rem",
          }}
        />

        {/* Mobile CTA */}
        <a
          href="#contact"
          ref={ctaRef}
          onClick={closeMenu}
          className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
            font-semibold tracking-wide text-white transition-opacity duration-200
            hover:opacity-85"
          style={{ background: "var(--primary)", fontSize: "0.9rem" }}
        >
          Start a Project →
        </a>

        {/* Subtle bottom email link */}
        <a
          href="mailto:madutek@gmail.com"
          className="absolute bottom-10 left-8 text-xs tracking-widest uppercase
            text-white/30 hover:text-orange-300 transition-colors duration-200"
        >
          madutek@gmail.com
        </a>

        {/* Watermark — same signature as footer */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-0.1em",
            right: "-0.05em",
            fontSize: "clamp(6rem, 30vw, 14rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(249,115,22,0.06)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          MADUTEK
        </span>
      </div>
    </div>
  );
}
