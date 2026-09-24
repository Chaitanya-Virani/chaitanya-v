import { FadeIn } from "./FadeIn";
import { AnimatedText } from "./AnimatedText";
import { profile } from "../data/profile";

export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">

      {/* Corner decorations — hidden on mobile to prevent overflow into adjacent sections */}
      <FadeIn delay={0.1} duration={0.9} x={-80}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="hidden sm:block absolute w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"
        />
      </FadeIn>

      <FadeIn delay={0.25} duration={0.9} x={-80}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="hidden sm:block absolute w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
        />
      </FadeIn>

      <FadeIn delay={0.15} duration={0.9} x={80}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="hidden sm:block absolute w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"
        />
      </FadeIn>

      <FadeIn delay={0.3} duration={0.9} x={80}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="hidden sm:block absolute w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
        />
      </FadeIn>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 z-10 max-w-[680px]">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[640px] text-[clamp(0.95rem,2vw,1.35rem)]"
        >
          {profile.about}
        </AnimatedText>
      </div>
    </section>
  );
};
