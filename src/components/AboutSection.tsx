import { FadeIn } from "./FadeIn";
import { AnimatedText } from "./AnimatedText";
import { profile } from "../data/profile";
import {
  ApprovalPipelineArt,
  EspBoardArt,
  PacketWaveArt,
  SchemaCheckArt,
} from "./AboutArt";

export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">

      {/* Corner drawings, one per kind of work on the site. Hidden on mobile. */}
      <EspBoardArt
        delay={0}
        className="hidden sm:block absolute w-[120px] sm:w-[150px] md:w-[190px] top-[6%] left-[2%] md:left-[5%]"
      />
      <PacketWaveArt
        delay={0.35}
        className="hidden sm:block absolute w-[120px] sm:w-[150px] md:w-[190px] bottom-[8%] left-[5%] md:left-[10%]"
      />
      <SchemaCheckArt
        delay={0.2}
        className="hidden sm:block absolute w-[120px] sm:w-[150px] md:w-[190px] top-[6%] right-[2%] md:right-[5%]"
      />
      <ApprovalPipelineArt
        delay={0.5}
        className="hidden sm:block absolute w-[120px] sm:w-[150px] md:w-[190px] bottom-[8%] right-[5%] md:right-[10%]"
      />

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