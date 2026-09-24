import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { tools } from "../data/profile";

// Pinned so an upstream icon rename can't silently break the strip.
const ICON_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@16.32.0/icons";

// brightness(0) collapses every brand colour to black, invert(1) flips it to white.
const ICON_FILTER = "brightness(0) invert(1)";

const LogoCard = ({ name, slug }: { name: string; slug: string }) => (
  <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 md:gap-3
                  w-[110px] h-[80px] md:w-[180px] md:h-[120px]">
    <img
      src={`${ICON_CDN}/${slug}.svg`}
      alt=""
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
      className="h-9 w-auto md:h-14"
      style={{ filter: ICON_FILTER }}
    />
    <span className="text-[#D7E2EA]/55 text-[0.6rem] md:text-[0.7rem] uppercase tracking-widest">
      {name}
    </span>
  </div>
);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
};

export const MarqueeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Scroll-linked drift driven by motion values: no React re-render per scroll event.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const travel = prefersReducedMotion ? 0 : isMobile ? 140 : 320;
  // Both rows stay at x <= 0 while visible, so neither row shows an empty gap on the left.
  const rowOneX = useTransform(scrollYProgress, [0, 1], [-320, -320 + travel]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [-40, -40 - travel]);

  const doubled = [...tools, ...tools];
  const rowTwo = [...doubled.slice(7), ...doubled.slice(0, 7)];

  return (
    <section aria-labelledby="tools-heading" className="bg-[#0C0C0C] pt-12 sm:pt-20 md:pt-32 pb-6 md:pb-10">
      <h2 id="tools-heading" className="sr-only">
        Tools I use: {tools.map((t) => t.name).join(", ")}
      </h2>
      <div ref={containerRef} className="relative overflow-hidden" aria-hidden="true">
        <motion.div className="flex flex-nowrap gap-3 mb-3" style={{ x: rowOneX }}>
          {doubled.map((tech, i) => (
            <LogoCard key={`a-${i}`} {...tech} />
          ))}
        </motion.div>
        <motion.div className="flex flex-nowrap gap-3" style={{ x: rowTwoX }}>
          {rowTwo.map((tech, i) => (
            <LogoCard key={`b-${i}`} {...tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
