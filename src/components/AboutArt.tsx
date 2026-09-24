import { useId, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Four line drawings, one per kind of work on this site:
   an ESP32 board, a schema-checked response, audio sliced into
   packets, and a pipeline with a human approval step.

   Strokes use the same chrome gradient as the headings. Mint marks
   the "verified / OK" state, the same meaning it has in Projects.
   Each drawing traces itself once when it scrolls into view.
   ───────────────────────────────────────────────────────────── */

const MINT = "#34d399";
const EASE = [0.22, 1, 0.36, 1] as const;

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.15 + i * 0.07, duration: 1.3, ease: EASE },
      opacity: { delay: 0.15 + i * 0.07, duration: 0.01 },
    },
  }),
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  shown: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.9 + i * 0.07, duration: 0.5, ease: EASE },
  }),
};

type ArtProps = { className?: string; delay?: number };

const Art = ({
  className = "",
  delay = 0,
  children,
}: ArtProps & { children: (stroke: string) => ReactNode }) => {
  const prefersReducedMotion = useReducedMotion();
  const gradientId = `art-${useId().replace(/:/g, "")}`;
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "shown",
        viewport: { once: true, amount: 0.4 },
        variants: { hidden: {}, shown: { transition: { delayChildren: delay } } },
      };

  return (
    <motion.svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...motionProps}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="20" x2="0" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#646973" />
          <stop offset="1" stopColor="#BBCCD7" />
        </linearGradient>
      </defs>
      {children(`url(#${gradientId})`)}
    </motion.svg>
  );
};

/* ── ESP32 module: board, antenna trace, shield can, pins, status LED ── */
export const EspBoardArt = (props: ArtProps) => (
  <Art {...props}>
    {(stroke) => (
      <g stroke={stroke}>
        <motion.rect variants={draw} custom={0} x="40" y="28" width="120" height="152" rx="10" />
        <motion.path
          variants={draw}
          custom={1}
          d="M58 50 h12 v-10 h12 v10 h12 v-10 h12 v10 h12 v-10 h12 v10 h12"
        />
        <motion.rect variants={draw} custom={2} x="58" y="62" width="84" height="66" rx="4" />
        <motion.path variants={draw} custom={3} d="M72 86 h44 M72 98 h28 M72 110 h36" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <motion.path
            key={`l${n}`}
            variants={draw}
            custom={4 + n * 0.3}
            d={`M40 ${66 + n * 13} h-12`}
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <motion.path
            key={`r${n}`}
            variants={draw}
            custom={4 + n * 0.3}
            d={`M160 ${66 + n * 13} h12`}
          />
        ))}
        <motion.rect variants={draw} custom={7} x="88" y="168" width="24" height="12" rx="2" />
        <motion.circle variants={pop} custom={2} cx="140" cy="152" r="4.5" fill={MINT} stroke="none" />
      </g>
    )}
  </Art>
);

/* ── Structured output: braces, key/value rows, and a passed check ── */
export const SchemaCheckArt = (props: ArtProps) => (
  <Art {...props}>
    {(stroke) => (
      <>
        <g stroke={stroke}>
          <motion.path
            variants={draw}
            custom={0}
            d="M66 36 c-14 0 -16 8 -16 20 v26 c0 8 -5 14 -12 14 c7 0 12 6 12 14 v26 c0 12 2 20 16 20"
          />
          <motion.path
            variants={draw}
            custom={0}
            d="M134 36 c14 0 16 8 16 20 v26 c0 8 5 14 12 14 c-7 0 -12 6 -12 14 v26 c0 12 -2 20 -16 20"
          />
          <motion.path variants={draw} custom={1} d="M72 70 h24 M104 70 h22" />
          <motion.path variants={draw} custom={2} d="M72 96 h16 M96 96 h34" />
          <motion.path variants={draw} custom={3} d="M72 122 h26 M106 122 h14" />
          <motion.circle variants={draw} custom={1.5} cx="99.5" cy="70" r="1.2" />
          <motion.circle variants={draw} custom={2.5} cx="91.5" cy="96" r="1.2" />
          <motion.circle variants={draw} custom={3.5} cx="101.5" cy="122" r="1.2" />
        </g>
        <g stroke={MINT} strokeWidth={2}>
          <motion.circle variants={draw} custom={5} cx="152" cy="160" r="19" />
          <motion.path variants={draw} custom={7} d="M143 160 l6.5 6.5 l12 -13" />
        </g>
      </>
    )}
  </Art>
);

/* ── Audio sliced into packets: waveform, cut lines, packet row ── */
const WAVE =
  "M20 78.0 L22 81.4 L24 85.3 L26 88.1 L28 88.3 L30 85.0 L32 79.0 L34 72.3 L36 66.9 L38 64.1 L40 64.6 L42 68.3 L44 75.3 L46 84.7 L48 94.5 L50 101.3 L52 101.8 L54 95.3 L56 83.8 L58 71.7 L60 63.1 L62 60.0 L64 61.9 L66 67.1 L68 73.7 L70 80.6 L72 86.5 L74 90.2 L76 90.7 L78 87.7 L80 82.4 L82 76.8 L84 72.6 L86 70.8 L88 71.3 L90 73.3 L92 75.8 L94 78.2 L96 80.6 L98 82.8 L100 84.2 L102 84.1 L104 82.1 L106 78.3 L108 73.9 L110 70.2 L112 68.6 L114 69.5 L116 72.6 L118 76.9 L120 81.5 L122 85.6 L124 88.4 L126 89.2 L128 86.9 L130 81.0 L132 72.6 L134 64.2 L136 59.1 L138 59.4 L140 64.9 L142 73.3 L144 81.7 L146 87.7 L148 90.6 L150 90.3 L152 87.4 L154 82.2 L156 76.1 L158 70.8 L160 68.1 L162 68.7 L164 71.8 L166 75.2 L168 78.6 L170 82.6 L172 85.8 L174 87.1 L176 86.2 L178 83.1 L180 78.0";

export const PacketWaveArt = (props: ArtProps) => (
  <Art {...props}>
    {(stroke) => (
      <g stroke={stroke}>
        <motion.path variants={draw} custom={0} d={WAVE} />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <motion.path
            key={`c${n}`}
            variants={draw}
            custom={3 + n * 0.25}
            d={`M${20 + n * 20} 112 v14`}
            strokeDasharray="2 4"
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
          <motion.rect
            key={`p${n}`}
            variants={draw}
            custom={4 + n * 0.3}
            x={23 + n * 20}
            y={134}
            width={14}
            height={22}
            rx={3}
          />
        ))}
        <motion.path variants={draw} custom={7} d="M20 172 h160" />

        
        <motion.path variants={draw} custom={8} d="M172 166 l8 6 l-8 6" />
      </g>
    )}
  </Art>
);

/* ── Workflow: trigger, draft, human approval, deploy ── */
export const ApprovalPipelineArt = (props: ArtProps) => (
  <Art {...props}>
    {(stroke) => (
      <>
        <g stroke={stroke}>
          {/* nodes */}
          <motion.rect variants={draw} custom={0} x="16" y="34" width="40" height="40" rx="10" />
          <motion.rect variants={draw} custom={1} x="80" y="34" width="40" height="40" rx="10" />
          <motion.rect variants={draw} custom={3} x="144" y="126" width="40" height="40" rx="10" />
          {/* edges */}
          <motion.path variants={draw}   custom={0.8} d="M56 54 h24" />
          <motion.path variants={draw} custom={1.8} d="M100 74 v52" />
          <motion.path variants={draw} custom={2.8} d="M120 146 h24" />
          {/* glyphs: trigger, draft, deploy */}
          <motion.circle variants={draw} custom={0.5} cx="36" cy="54" r="7" />
          <motion.path variants={draw} custom={1.5} d="M90 48 h20 M90 56 h20 M90 64 h12" />
          <motion.path variants={draw} custom={3.5} d="M164 156 v-18 M157 145 l7 -7 l7 7" />
        </g>
        {/* approval node */}
        <g stroke={MINT} strokeWidth={2}>
          <motion.rect variants={draw} custom={2.2} x="80" y="126" width="40" height="40" rx="10" />
          <motion.path variants={draw} custom={3} d="M91 146 l6 6 l12 -13" />
        </g>
      </>
    )}
  </Art>
);