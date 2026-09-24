import { FadeIn } from "./FadeIn";
import { capabilities } from "../data/profile";

export const ServicesSection = () => {
  return (
    <section id="skills" className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={20}>
        <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Skills
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {capabilities.map((item, index) => (
          <div key={item.title} className="border-b border-[rgba(12,12,12,0.15)]">
            <FadeIn delay={index * 0.1} y={10}>
              <div className="flex items-start gap-5 sm:gap-8 py-8 sm:py-10 md:py-12">
                <div className="font-black text-[#0C0C0C] leading-none text-[clamp(3rem,10vw,140px)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#0C0C0C] font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)]">
                    {item.title}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[oklch(40%_0.01_260)]">
                    {item.description}
                  </p>
                  <p className="mt-3 text-[clamp(0.8rem,1.3vw,1rem)] text-[oklch(40%_0.01_260)]">
                    Shown in{" "}
                    {item.proof.map((p, i) => (
                      <span key={p.href + p.label}>
                        {i > 0 && ", "}
                        <a
                          href={p.href}
                          className="font-medium text-[#0C0C0C] underline decoration-[#0C0C0C]/30 underline-offset-4 hover:decoration-[#0C0C0C] transition-colors duration-300"
                        >
                          {p.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
    </section>
  );
};
