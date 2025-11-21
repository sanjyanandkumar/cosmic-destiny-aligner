import * as React from "react";
import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";

const ConsultingPage: React.FC = () => {
  const services = [
    {
      id: "blueprint",
      name: "Karmic Business Blueprint",
      price: 1000,
      description:
        "Decode your birth chart to craft a business model aligned with your innate strengths, purpose, and planetary timing.",
      image: karmicConsultingImg,
    },
    {
      id: "brand-architecture",
      name: "Strategic Brand Architecture",
      price: 5000,
      description:
        "Build a brand ecosystem that communicates powerfully and scales effortlessly.",
      image: karmicConsultingImg,
    },
    {
      id: "communication",
      name: "Communication & Positioning",
      price: 5000,
      description:
        "Shape your narrative to magnetize the right clients, partners, and investors.",
      image: karmicConsultingImg,
    },
    {
      id: "karmic-colors",
      name: "Website Creation Using Karmic Colors",
      price: 5000,
      description:
        "Website design, creation, and hosting that aligns your digital energy with your karmic identity.",
      image: karmicConsultingImg,
    },
  ];

  return (
    <CosmicPage>
      <Navigation />

      <section id="consulting" className="py-24">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-playfair text-5xl font-bold text-white mb-4 leading-tight">
              BrahmaX Consulting
            </h1>
            <p className="font-inter text-xl text-primary italic mb-6">
              The Karmic Business Division
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Scaling destiny, not just business. Each consulting stage decodes, designs,
              and aligns your venture with your karmic frequency — from blueprint to branding to growth.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link key={service.id} to={`/consulting/${service.id}`} className="group">
                <Card className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:border-primary/60 transition-all duration-500 cursor-pointer">
                  <div className="relative h-[260px] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                      ₹{service.price.toLocaleString()}
                    </p>
                    <Button className="w-full mt-4">View Details</Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default ConsultingPage;
