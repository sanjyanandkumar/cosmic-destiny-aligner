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
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const LeisurePage: React.FC = () => {
  const { addToCart } = useCart();

  const experiences = [
    {
      id: "temple-run",
      name: "Temple Run",
      priceRange: "₹16,999 – ₹25,999",
      price: 16999,
      description:
        "A planetary-aligned spiritual journey across the Navagraha temples of Kumbakonam — South India’s sacred axis of divine geometry.",
      image: kumbakonamImg,
    },
    {
      id: "karmic-meditation",
      name: "Customized Karmic Meditation",
      price: 2000,
      description:
        "Personalized karmic meditation session designed to realign your energy and restore divine frequency.",
      image: karmicMeditationImg,
    },
    {
      id: "bali-retreat",
      name: "Bali Wellness Retreat",
      price: 50000,
      description:
        "Luxurious karmic wellness retreat in Bali with spiritual temples and cosmic energy experiences.",
      image: baliTripImg,
    },
    {
      id: "bandipur-retreat",
      name: "Bandipur Tour",
      price: 9999,
      description:
        "Organic wellness retreat designed to align mind, body, and soul in the serene energy of Bandipur Forest, Karnataka.",
      image: bandipurImg,
    },
    {
      id: "sri-lanka-retreat",
      name: "Karmic Island Experience – Sri Lanka",
      price: 55000,
      description:
        "A karmic escape into the heart of Sri Lanka’s spiritual energy — lush forests, sacred temples, and coastal calm.",
      image: sriLankaImg,
    },
  ];

  return (
    <CosmicPage>
      <Navigation />

      <section id="leisure" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
                BrahmaX Leisure
              </h1>

              <p className="font-inter text-xl text-primary italic mb-6">
                An experiential space aligned with divine frequency
              </p>

              <p className="font-inter text-lg text-white/70 leading-relaxed max-w-4xl mx-auto">
                BrahmaX Wellness curates divine experiences through travel, meditation, and cosmic realignment. Each offering is designed to restore spiritual harmony, awaken planetary consciousness, and return you to your divine rhythm
              </p>

              <p className="mt-4 text-lg italic text-primary">
                “Wellness isn’t an escape — it’s a return to your cosmic essence.”
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
                          <p className="text-white/70 mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          {/* ⭐ Add to Cart Button */}
                          <Button
                            onClick={(e) => {
                              e.preventDefault();

                              addToCart({
                                id: exp.id,
                                name: exp.name,
                                price: exp.price ?? 0,
                                quantity: 1,
                                image_url: exp.image,
                                category: "Leisure Experience",
                              });

                              toast({
                                title: "Added to Cart!",
                                description: `${exp.name} has been added to your cart.`,
                              });
                            }}
                            className="mt-4 w-full bg-primary/20 text-primary hover:bg-primary hover:text-black transition-all"
                          >
                            Tell me more
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default LeisurePage;
