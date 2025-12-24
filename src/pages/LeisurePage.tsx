import * as React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import baliTripImg from "@/assets/bali-trip.jpg";
import karmicMeditationImg from "@/assets/karmic-meditation.jpg";
import kumbakonamImg from "@/assets/kumbakonam-temple.jpg";
import bandipurImg from "@/assets/bandipur-forest.jpg";
import sriLankaImg from "@/assets/sri-lanka-retreat.jpg"; 
import CosmicPage from "@/components/CosmicPage";
import { Button } from "@/components/ui/button";
import remediesImg from "@/assets/karmic-remedies.png";
import SpeakToFounderDialog from "@/components/SpeakToFounderDialog";

const LeisurePage: React.FC = () => {
  const [openLeadDialog, setOpenLeadDialog] = React.useState(false);
  const [selectedExperience, setSelectedExperience] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  const experiences = [
    {
      id: "temple-run",
      name: "Temple Run",
      priceRange: "₹16,999 – ₹25,999",
      description:
        "A planetary-aligned spiritual journey across the Navagraha temples of Kumbakonam — South India’s sacred axis of divine geometry.",
      image: kumbakonamImg,
    },
    {
      id: "karmic-meditation",
      name: "Customized Karmic Meditation",
      description:
        "Personalized karmic meditation session designed to realign your energy and restore divine frequency.",
      image: karmicMeditationImg,
    },
    {
      id: "karmic-remedies",
      name: "Karmic Personalized Remedies",
      description:
        "Individually prescribed karmic remedies based on your birth chart — gemstones, mantras, rituals, and energy corrections designed to neutralize planetary imbalances and accelerate alignment.",
      image: remediesImg,
    }
  ];

  return (
    <CosmicPage>
      <Navigation />

      <section id="leisure" className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
                BrahmaX Leisure
              </h1>

              <p className="font-inter text-xl text-muted-foreground italic mb-6">
                An experiential space aligned with divine frequency
              </p>

              <p className="font-inter text-lg text-white leading-relaxed max-w-4xl mx-auto">
                BrahmaX Wellness curates divine experiences through travel, meditation, and cosmic realignment. Each offering is designed to restore spiritual harmony, awaken planetary consciousness, and return you to your divine rhythm
              </p>
            </div>

            {/* Experiences Grid */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {experiences.map((exp) => (
                  <div key={exp.id} className="group">
                    <Link to={`/leisure/${exp.id}`} className="block">
                      <Card
                        className="overflow-hidden border border-cosmic-blue/30 bg-card/30 backdrop-blur-md 
                        hover:border-primary/60 hover:shadow-[0_0_25px_rgba(255,220,120,0.4)]
                        transition-all duration-500 cursor-pointer"
                      >
                        <div className="relative h-[320px] overflow-hidden">
                          <img
                            src={exp.image}
                            alt={exp.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <div className="p-6">
                          <h2 className="font-playfair text-2xl font-bold text-white mb-2">
                            {exp.name}
                          </h2>
                          <p className="text-white/70 mb-4 leading-relaxed text-justify">
                            {exp.description}
                          </p>

                          {/* ⭐ Add to Cart Button */}
                          <div className="flex justify-center mt-2">
                            <Button
                              onClick={(e) => {
                                e.preventDefault(); // prevent <Link> navigation

                                setSelectedExperience({
                                  id: exp.id,
                                  name: exp.name,
                                });

                                setOpenLeadDialog(true);
                              }}
                              className="
                                mt-4
                                w-[170px]
                                inline-block font-bold
                                px-8 py-2
                                rounded-lg
                                bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                                text-black shadow-lg
                                hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                                transition-all
                              "
                            >
                              Reserve NOW
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                to="/leisure/more"
                className="text-white text-lg underline hover:text-primary/70 transition-all"
              >
                More Wellness Packages →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
        {openLeadDialog && selectedExperience && (
          <SpeakToFounderDialog
            open={openLeadDialog}
            onOpenChange={setOpenLeadDialog}
            serviceId={selectedExperience.id}
            serviceTitle={selectedExperience.name}
            serviceType="Leisure Experience"
          />
        )}
    </CosmicPage>
  );
};

export default LeisurePage;
