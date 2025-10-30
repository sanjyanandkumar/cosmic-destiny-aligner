import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, BookOpen, Plane } from "lucide-react";

const offers = [
  {
    icon: FileText,
    title: "Karmic Outfit Report",
    price: "₹1,499",
    description: "Personalized wardrobe guide based on your birth chart",
    badge: "Most Popular",
  },
  {
    icon: Users,
    title: "Business Reading",
    price: "₹2,999",
    description: "Strategic business guidance aligned with your dharma",
    badge: null,
  },
  {
    icon: BookOpen,
    title: "Stream Passport",
    price: "₹4,999",
    description: "Educational pathway mapping to your destiny",
    badge: null,
  },
  {
    icon: Plane,
    title: "Karmic Retreat",
    price: "₹25,000+",
    description: "Transformational journeys that activate your karma",
    badge: "Premium",
  },
];

const FeaturedOffers = () => {
  return (
    <section className="py-24 bg-cosmic-indigo relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Offerings
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your path to cosmic alignment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Card
                key={index}
                className="group p-6 bg-card/80 backdrop-blur-sm border-cosmic-blue/30 hover:border-primary/50 transition-all duration-300 hover:shadow-cosmic flex flex-col"
              >
                <div className="flex-1 space-y-4">
                  {offer.badge && (
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {offer.badge}
                    </Badge>
                  )}
                  
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                      {offer.title}
                    </h3>
                    <p className="font-playfair text-3xl font-bold text-primary mb-3">
                      {offer.price}
                    </p>
                    <p className="font-inter text-muted-foreground">
                      {offer.description}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-inter font-semibold transition-all"
                >
                  Learn More
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
