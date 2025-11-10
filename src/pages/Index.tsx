import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustProof from "@/components/TrustProof";
import HowItWorks from "@/components/HowItWorks";
import VerticalCards from "@/components/VerticalCards";
import FeaturedOffers from "@/components/FeaturedOffers";
import KarmaKingdomsShowcase from "@/components/KarmaKingdomsShowcase";
import Footer from "@/components/Footer";
import ScrollNavigation from "@/components/ScrollNavigation";
import FloatingConsultationButton from "@/components/FloatingConsultationButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      <KarmaKingdomsShowcase />
      <ScrollNavigation />
      <FloatingConsultationButton />
      <div id="hero">
        <Hero />
      </div>
      <VerticalCards />
      <div id="how-it-works">
        <HowItWorks />
      </div>
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
