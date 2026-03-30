import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandCarousel from "@/components/BrandCarousel";
import Features from "@/components/Features";

import Payments from "@/components/Payments";
import Branding from "@/components/Branding";
import HowItWorks from "@/components/HowItWorks";
import FounderMemo from "@/components/FounderMemo";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandCarousel />
      <Features />
      <Payments />
      <Branding />
      <HowItWorks />
      <FounderMemo />
      <FinalCTA />
      <Footer />
    </main>
  );
}
