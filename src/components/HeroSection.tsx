import { useState, useEffect } from "react";
import { FadeIn } from "./FadeIn";
import { SplineHero } from "./SplineHero";
import { profile } from "../data/profile";

const NAV_LINKS = [
  { href: "#about",      label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills",     label: "Skills" },
  { href: "#projects",   label: "Projects" },
  { href: "#contact",    label: "Contact" },
];

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
};

export const HeroSection = () => {
  const isDesktop = useIsDesktop();

  return (
    <header className="min-h-screen flex flex-col overflow-x-clip main-wrapper relative">

      {/* ── Navbar ── */}
      <FadeIn delay={0} y={-20}>
        <nav
          aria-label="Main"
          className="px-5 sm:px-8 md:px-10 pt-5 sm:pt-6 md:pt-8 flex flex-wrap items-center justify-between gap-y-3 relative z-10"
        >
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 md:gap-x-8">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider
                           text-xs sm:text-sm md:text-lg lg:text-[1.4rem]
                           hover:opacity-60 transition-all duration-300 hover:-translate-y-0.5"
              >
                {label}
              </a>
            ))}
          </div>

          {profile.resume && (
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-wider
                         px-4 py-1.5 text-xs sm:text-sm md:px-5 md:py-2 md:text-base
                         hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors duration-300"
            >
              Resume
            </a>
          )}
        </nav>
      </FadeIn>

      {/* ── Desktop: robot absolutely fills right 60% ── */}
      {isDesktop && (
        <div className="absolute inset-y-0 right-0 w-[60%] lg:w-[55%] z-0">
          <SplineHero />
        </div>
      )}

      {/* ── Desktop only: flex-1 spacer pushes text to bottom ── */}
      {isDesktop && <div className="flex-1" />}

      {/* ── Heading (one h1, two visual lines) ── */}
      <FadeIn delay={0.15} y={40}>
        <div className="relative z-10 overflow-hidden px-5 sm:px-8 md:px-10
                        pt-8 sm:pt-10 md:pt-0 pb-1 md:pb-2">
          <h1 className="font-black uppercase tracking-tight leading-none
                         text-[16vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw]">
            <span className="hero-heading block">Hi, i&apos;m</span>
            <span className="hero-heading block -mt-1 sm:-mt-2 md:-mt-4">chaitanya</span>
          </h1>
        </div>
      </FadeIn>

      {/* ── Mobile only: robot in flow, below heading ── */}
      {!isDesktop && (
        <div className="relative z-0 w-full" style={{ height: "65vw" }}>
          <SplineHero />
        </div>
      )}

      {/* ── Tagline + status ── */}
      <FadeIn delay={0.35} y={20}>
        <div className="relative z-10 pb-8 sm:pb-9 md:pb-10
                        px-5 sm:px-8 md:px-10 pt-3 md:pt-0">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
                        max-w-[200px] sm:max-w-[240px] md:max-w-[260px]
                        text-[clamp(0.65rem,2.8vw,0.9rem)] md:text-[clamp(0.75rem,1.4vw,1.5rem)]">
            {profile.tagline}
          </p>
          <p className="mt-3 md:mt-4 text-[#D7E2EA]/60 font-light leading-snug
                        max-w-[260px] sm:max-w-[320px] md:max-w-[380px]
                        text-[clamp(0.75rem,2.8vw,0.9rem)] md:text-[clamp(0.8rem,1vw,1.05rem)]">
            {profile.status}
          </p>
        </div>
      </FadeIn>
    </header>
  );
};
