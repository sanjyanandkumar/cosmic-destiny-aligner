import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LeadMagnetCTA from "@/components/LeadMagnetCTA";
import FeaturedOffers from "@/components/FeaturedOffers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <Hero />
      <HowItWorks />
      <LeadMagnetCTA />
      <FeaturedOffers />
      <Footer />
    </div>
  );
};

export default Index;
