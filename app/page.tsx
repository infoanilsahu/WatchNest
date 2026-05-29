import Image from "next/image";
import { styles } from "@/components/landingPage/styles";
import { NavbarHome } from "@/components/common/NavbarHome";
import { HeroSection } from "@/components/landingPage/HeroSection";
import { FeaturesHighlight } from "@/components/landingPage/FeaturesHighlight";
import { PrivacySection } from "@/components/landingPage/PrivacySection";
import { HowItWorks } from "@/components/landingPage/HowItWorks";
import { CTASection } from "@/components/landingPage/CTASection";
import { Footer } from "@/components/landingPage/Footer";
import { GlowOrb } from "@/components/landingPage/GlowOrb";
import { C } from "@/components/landingPage/colors";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#050816] font-['Inter'] text-white">
      <NavbarHome />
      <HeroSection />
      
    </div>
  );
}
