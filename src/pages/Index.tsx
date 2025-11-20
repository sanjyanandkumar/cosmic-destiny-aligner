import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustProof from "@/components/TrustProof";
import HowItWorks from "@/components/HowItWorks";
import VerticalCards from "@/components/VerticalCards";
import FeaturedOffers from "@/components/FeaturedOffers";
import KarmaKingdomsShowcase from "@/components/KarmaKingdomsShowcase";
import Footer from "@/components/Footer";
import FloatingConsultationButton from "@/components/FloatingConsultationButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="font-sans text-[17px]">
        <Navigation />
      </div>
      <KarmaKingdomsShowcase />
      <FloatingConsultationButton />
      <div id="hero" className="m-0 p-0">
        <Hero />
      </div>
      <div id="how-it-works" className="m-0 p-0">
        <HowItWorks />
      </div>
      <VerticalCards />
      <div id="offers">
        <FeaturedOffers />
      </div>
      <div id="trust">
        <TrustProof />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
