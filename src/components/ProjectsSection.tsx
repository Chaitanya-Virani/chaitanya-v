import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";
import { ProjectSpecimen } from "./ProjectSpecimens";
import { projects, type Project } from "../data/profile";

const ProjectCard = ({
  project,
  index,
  progress,
  targetScale,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  targetScale: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const scale = useTransform(progress, [index / projects.length, 1], [1, targetScale]);

  return (
    <div
      id={project.id}
      className="project-sticky w-full flex items-start justify-center mb-6"
      style={{ top: `calc(1.5rem + ${index * 24}px)` }}
    >
      <motion.article
        style={{
          scale: prefersReducedMotion ? 1 : scale,
          transformOrigin: "top center",
        }}
        aria-labelledby={`${project.id}-title`}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C]
                   p-5 sm:p-7 md:p-9 lg:p-10 shadow-2xl
                   grid gap-7 lg:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
      >
        {/* ── Text column ── */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-end gap-4 sm:gap-5">
            <span aria-hidden="true" className="font-black text-white leading-[0.8] text-[clamp(2.75rem,6vw,5.5rem)]">
              {project.number}
            </span>
            <div className="min-w-0 pb-0.5">
              <p className="text-[#D7E2EA]/60 text-xs sm:text-sm uppercase tracking-wider">
                {project.category}
              </p>
              <h3
                id={`${project.id}-title`}
                className="text-white font-black tracking-tight leading-[1.05] text-[clamp(1.4rem,2.6vw,2.4rem)]"
              >
                {project.title}
              </h3>
            </div>
          </div>

          <p className="mt-5 text-[#D7E2EA] font-light leading-snug max-w-[56ch] text-[clamp(1rem,1.35vw,1.25rem)]">
            {project.summary}
          </p>

          <ul className="mt-4 flex flex-col gap-2.5 max-w-[62ch]">
            {project.details.map((d) => (
              <li
                key={d}
                className="relative pl-5 text-[#D7E2EA]/70 font-light leading-relaxed text-[clamp(0.875rem,1vw,1rem)]
                           before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-[#D7E2EA]/50"
              >
                {d}
              </li>
            ))}
          </ul>

          <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-[#D7E2EA]/20 px-2.5 py-0.5 text-[#D7E2EA]/80 text-xs"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 lg:mt-auto lg:pt-6">
            <LiveProjectButton
              projectTitle={project.title}
              githubHref={project.githubHref}
              liveHref={project.liveHref}
            />
            {project.liveNote && (
              <p className="mt-2 text-[#D7E2EA]/50 text-xs">{project.liveNote}</p>
            )}
          </div>
        </div>

        {/* ── Specimen column ── */}
        <ProjectSpecimen type={project.specimen} />
      </motion.article>
    </div>
  );
};

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10
                 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={20}>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-12 sm:mb-16 md:mb-20">
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            progress={scrollYProgress}
            targetScale={1 - (projects.length - 1 - index) * 0.03}
          />
        ))}
      </div>
    </section>
  );
};
