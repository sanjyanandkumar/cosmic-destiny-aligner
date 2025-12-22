import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import baliTripImg from "@/assets/bali-trip.jpg";
import bandipurImg from "@/assets/bandipur-forest.jpg";
import sriLankaImg from "@/assets/sri-lanka-retreat.jpg";

const packages = [
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
      "A karmic escape into Sri Lanka’s spiritual energy — lush forests, sacred temples, and coastal calm.",
    image: sriLankaImg,
  },
];

export default function MoreWellnessPackages() {
  return (
    <CosmicPage>
      <Navigation />

      <section className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center mb-10">
            <h1 className="font-playfair text-5xl font-bold text-white mb-4">
              More Wellness Packages
            </h1>

            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              Advanced karmic journeys designed for deeper alignment, luxury healing,
              and transformational experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg) => (
              <Link key={pkg.id} to={`/leisure/${pkg.id}`}>
                <Card className="overflow-hidden bg-white/10 border border-white/20 hover:shadow-[0_0_25px_rgba(255,220,120,0.4)] transition-all">
                  <div className="relative h-[320px]">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h2 className="font-playfair text-2xl font-bold text-white mb-2">
                      {pkg.name}
                    </h2>

                    <p className="text-white/70 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/leisure"
              className="text-white text-lg underline hover:text-primary/70"
            >
              ← Back to Leisure
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
}
