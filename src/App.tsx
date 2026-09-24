import { MotionConfig } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";

const App = () => {
  return (
    // reducedMotion="user": entrance slides are skipped for people who ask their OS for less motion.
    <MotionConfig reducedMotion="user">
      <div className="main-wrapper overflow-x-clip">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#D7E2EA] focus:px-5 focus:py-2 focus:text-[#0C0C0C] focus:font-medium"
        >
          Skip to content
        </a>
        <HeroSection />
        <main>
          <MarqueeSection />
          <AboutSection />
          <ExperienceSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </MotionConfig>
  );
};

export default App;
