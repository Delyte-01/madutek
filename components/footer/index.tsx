"use client";

import React from "react";
import { FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import PageMaxWidth from "../pageMaxWidth";
import Logo from "../logo";

/* ---------- Data ---------- */
// Point each href at the real section id / route in your site.
const NAV = [
  {
    title: "Services",
    links: [
      { label: "Custom websites", href: "#services" },
      { label: "E-commerce", href: "#services" },
      { label: "Web applications", href: "#services" },
      { label: "UI/UX design", href: "#services" },
      { label: "SEO & performance", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Process", href: "#process" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },
] as const;

const SOCIALS = [
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaGithub, label: "GitHub", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
] as const;

const LEGAL = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
] as const;

/* ---------- Shared classes ---------- */
const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#b08eff]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]";
const headingCls = "mb-5 text-sm font-semibold text-white/90";
const linkCls = `group/link inline-flex items-center rounded text-sm text-white/50 transition-colors duration-200 hover:text-white ${focusRing}`;

/* ---------- Component ---------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050507] font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
      {/* Top hairline with accent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(176,142,255,0.4) 35%, rgba(110,231,247,0.4) 65%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[80vw] max-w-[900px] -translate-x-1/2 rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,92,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Brand watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-0.15em] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap font-black leading-none tracking-[-0.05em] text-transparent"
        style={{
          fontSize: "clamp(5rem, 21vw, 18rem)",
          WebkitTextStroke: "1px rgba(176,142,255,0.08)",
        }}
      >
        MADUTEK
      </span>

      <PageMaxWidth>
        <div className="relative z-10 px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-12">
          <div className="grid gap-14 md:grid-cols-[2fr_3fr] md:gap-12 lg:gap-20">
            {/* ── Brand column ── */}
            <div className="max-w-[26rem]">
              <a
                href="#"
                aria-label="MaduTek home"
                className={`mb-6 inline-flex items-center rounded ${focusRing}`}
              >
                <Logo />
              </a>

              <p className="mb-8 text-base leading-[1.7] text-white/50 sm:text-[1.05rem]">
                High-performance websites built to convert.
                <br />
                Remote-first. Worldwide.
              </p>

              <a
                href="mailto:madutek@gmail.com"
                className={`inline-flex max-w-full items-center gap-2 break-all rounded-full border border-[#b08eff]/25 bg-[#b08eff]/5 px-4 py-2.5 text-[13px] text-[#c9b3ff] transition-colors duration-200 hover:border-[#b08eff]/60 hover:bg-[#b08eff]/15 hover:text-white ${focusRing}`}
              >
                <Mail size={14} aria-hidden className="shrink-0" />
                sylvanusmaduneche@gmail.com
              </a>

              <div className="mt-7 flex gap-2.5">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/45 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b08eff]/50 hover:bg-[#b08eff]/10 hover:text-[#c9b3ff] ${focusRing}`}
                  >
                    <Icon size={15} aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Nav + availability ── */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
              {NAV.map(({ title, links }) => (
                <nav key={title} aria-label={title}>
                  <p className={headingCls}>{title}</p>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <a href={href} className={linkCls}>
                          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                            {label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              {/* Availability */}
              <div className="col-span-2 sm:col-span-1">
                <p className={headingCls}>Availability</p>

                <div className="mb-1 flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[13px] text-white/75">
                    Taking new projects
                  </span>
                </div>
                <p className="m-0 text-[13px] leading-relaxed text-white/35">
                  Replies within 48 hours.
                </p>

                <a
                  href="#contact"
                  className={`group/cta mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#7c5cff] to-[#4a8cf0] px-5 py-2.5 text-[13px] font-semibold tracking-tight text-white shadow-[0_4px_18px_rgba(124,92,255,0.3)] transition-shadow duration-300 hover:shadow-[0_6px_26px_rgba(124,92,255,0.5)] ${focusRing}`}
                >
                  Start a project
                  <ArrowUpRight
                    size={14}
                    aria-hidden
                    className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="mt-16 flex flex-col gap-5 border-t border-white/[0.07] pt-7 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 text-xs text-white/30">
              © {new Date().getFullYear()} MaduTek. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {LEGAL.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`rounded text-xs text-white/30 transition-colors duration-200 hover:text-white/70 ${focusRing}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </PageMaxWidth>
    </footer>
  );
}
