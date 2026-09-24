import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface AnimatedTextProps {
  children: string;
  className?: string;
}

/**
 * Scroll-linked, character-by-character reveal.
 *
 * Characters are grouped inside whole-word spans that cannot break, so lines
 * only wrap between words. The full sentence is exposed once to screen
 * readers, and people who prefer reduced motion get plain text.
 */
export const AnimatedText = ({ children, className = "" }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={className}>
        {children}
      </p>
    );
  }

  const total = children.length;
  const words = children.split(" ");
  let cursor = 0;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const start = cursor;
          cursor += word.length + 1;
          return (
            <Fragment key={wordIndex}>
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, charIndex) => (
                  <AnimatedChar
                    key={charIndex}
                    char={char}
                    index={start + charIndex}
                    total={total}
                    progress={scrollYProgress}
                  />
                ))}
              </span>
              {wordIndex < words.length - 1 && " "}
            </Fragment>
          );
        })}
      </span>
    </p>
  );
};

const AnimatedChar = ({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = Math.min(start + 1 / total + 0.1, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return <motion.span style={{ opacity }}>{char}</motion.span>;
};
