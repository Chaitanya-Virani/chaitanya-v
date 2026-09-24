import { FadeIn } from "./FadeIn";
import { ContactButton } from "./ContactButton";
import { profile } from "../data/profile";

const linkClass =
  "text-[#D7E2EA]/60 font-medium uppercase tracking-wider text-sm hover:text-[#D7E2EA] transition-colors duration-300";

export const ContactSection = () => {
  const links = [
    { label: "GitHub", href: profile.github, external: true },
    { label: "LinkedIn", href: profile.linkedin, external: true },
    { label: "Resume", href: profile.resume, external: true },
  ].filter((l) => l.href);

  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-8 sm:mb-12 md:mb-16">
            Let&apos;s Talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <p className="text-[#D7E2EA] font-light text-[clamp(1rem,2vw,1.35rem)] leading-relaxed max-w-[520px] mb-12 sm:mb-16 md:mb-20">
            Hiring for an AI engineering role, or have a project that should think for itself? Drop me a message.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <ContactButton />
        </FadeIn>

        <FadeIn delay={0.35} y={10}>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block text-[#D7E2EA]/70 text-sm sm:text-base underline decoration-[#D7E2EA]/25 underline-offset-4 hover:text-[#D7E2EA] transition-colors duration-300"
          >
            {profile.email}
          </a>
        </FadeIn>

        <FadeIn delay={0.4} y={10}>
          <ul className="mt-14 sm:mt-16 md:mt-20 flex flex-wrap justify-center gap-x-8 gap-y-3 sm:gap-x-12">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={linkClass}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.5} y={0}>
          <p className="mt-16 text-[#D7E2EA]/40 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
