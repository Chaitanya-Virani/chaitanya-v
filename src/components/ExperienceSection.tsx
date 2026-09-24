import { FadeIn } from "./FadeIn";
import { experience, recognition } from "../data/profile";

const isExternal = (href: string) => href.startsWith("http");

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-10 sm:pt-16 pb-24 sm:pb-32 md:pb-40"
    >
      <FadeIn delay={0} y={20}>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-12 sm:mb-16 md:mb-24">
          Experience
        </h2>
      </FadeIn>

      {/* ── Internship ── */}
      <div className="grid gap-8 md:gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] max-w-6xl">
        <FadeIn delay={0.05} y={20}>
          <div className="md:sticky md:top-10">
            <p className="text-[#D7E2EA]/60 text-sm sm:text-base">{experience.period}</p>
            <h3 className="mt-2 text-white font-black uppercase tracking-tight leading-[0.95] text-[clamp(2rem,4.4vw,4rem)]">
              {experience.org}
            </h3>
            <p className="mt-3 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm sm:text-base md:text-lg">
              {experience.role}
            </p>
            <p className="mt-5 text-[#D7E2EA]/70 font-light leading-relaxed max-w-[42ch] text-[clamp(0.95rem,1.3vw,1.15rem)]">
              {experience.summary}
            </p>
          </div>
        </FadeIn>

        <ul className="border-t border-[#D7E2EA]/15">
          {experience.highlights.map((item, i) => (
            <li key={item.title} className="border-b border-[#D7E2EA]/15">
              <FadeIn delay={0.05 * i} y={10}>
                <div className="py-6 sm:py-7">
                  <h4 className="text-white font-medium text-lg sm:text-xl md:text-2xl leading-tight">
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(isExternal(item.href)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="underline decoration-[#D7E2EA]/30 underline-offset-[6px] hover:decoration-[#D7E2EA] transition-colors duration-300"
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h4>
                  <p className="mt-2 text-[#D7E2EA]/75 font-light leading-relaxed max-w-[62ch] text-[clamp(0.95rem,1.2vw,1.1rem)]">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Recognition, leadership, education ── */}
      <ul className="mt-20 sm:mt-24 md:mt-32 max-w-6xl border-t border-[#D7E2EA]/15">
        {recognition.map((row, i) => (
          <li key={row.label} className="border-b border-[#D7E2EA]/15">
            <FadeIn delay={0.05 * i} y={10}>
              <div className="grid gap-1 sm:gap-8 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] py-5 sm:py-6">
                <h3 className="text-white font-medium text-base sm:text-lg">{row.label}</h3>
                <p className="text-[#D7E2EA]/75 font-light leading-relaxed max-w-[62ch] text-[clamp(0.95rem,1.2vw,1.1rem)]">
                  {row.text}
                </p>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
};
