import { FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import PageMaxWidth from "../pageMaxWidth";
import Logo from "../logo";

export function Footer() {
  return (
    <footer className="relative py-20 bg-neutral-950">
      {/* Top gradient line */}
      <PageMaxWidth>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

        <div className="section-padding max-w-[1400px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#" className="flex items-center gap-3 mb-6 group">
              <Logo />
              </a>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                Crafting high-performance websites that turn visitors into
                customers. Remote-first, worldwide.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold mb-5 text-white/80">
                Services
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Custom Websites",
                  "E-Commerce",
                  "Web Applications",
                  "UI/UX Design",
                  "SEO & Performance",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold mb-5 text-white/80">
                Company
              </h4>
              <ul className="space-y-2.5">
                {["About", "Process", "Work", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-semibold mb-5 text-white/80">
                Connect
              </h4>
              <div className="flex gap-4 mb-6">
                {[
                  { icon: FaTwitter, label: "Twitter" },
                  { icon: FaGithub, label: "GitHub" },
                  { icon: FaLinkedinIn, label: "LinkedIn" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:bg-white/10 transition-all duration-300 shadow-md"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <a
                href="mailto:hello@forgestudio.dev"
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                hello@forgestudio.dev
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} Forge Studio. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </PageMaxWidth>
    </footer>
  );
}
