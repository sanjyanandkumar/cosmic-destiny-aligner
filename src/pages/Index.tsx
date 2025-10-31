import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VerticalCards from "@/components/VerticalCards";
import Philosophy from "@/components/Philosophy";
import Leadership from "@/components/Leadership";
import Awards from "@/components/Awards";
import HowItWorks from "@/components/HowItWorks";
import LeadMagnetCTA from "@/components/LeadMagnetCTA";
import FeaturedOffers from "@/components/FeaturedOffers";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <Hero />
      <About />
      <VerticalCards />
      <Philosophy />
      <Leadership />
      <Awards />
      <HowItWorks />
      <LeadMagnetCTA />
      <FeaturedOffers />
      <Footer />
    </div>
  );
};

export default Index;
