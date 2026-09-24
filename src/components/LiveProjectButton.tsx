import { motion } from "framer-motion";

interface LiveProjectButtonProps {
  className?: string;
  projectTitle: string;
  githubHref?: string;
  liveHref?: string;
}

const base =
  "rounded-full border-2 border-[#D7E2EA] font-medium uppercase tracking-widest px-5 py-2 sm:px-7 sm:py-2.5 text-xs sm:text-sm transition-colors";
const primary = `${base} bg-[#D7E2EA] text-[#0C0C0C] hover:bg-white`;
const secondary = `${base} text-[#D7E2EA] hover:bg-[#D7E2EA]/10`;

export const LiveProjectButton = ({
  className = "",
  projectTitle,
  githubHref,
  liveHref,
}: LiveProjectButtonProps) => {
  return (
    <div className={`${className} flex flex-wrap gap-2`}>
      {liveHref && (
        <motion.a
          href={liveHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the live demo of ${projectTitle} in a new tab`}
          className={primary}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Live demo
        </motion.a>
      )}
      {githubHref && (
        <motion.a
          href={githubHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the source code of ${projectTitle} on GitHub`}
          className={secondary}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Code
        </motion.a>
      )}
    </div>
  );
};
