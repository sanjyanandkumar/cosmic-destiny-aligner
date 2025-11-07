import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, BookOpen, Plane } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "./CheckoutDialog";
import bg from "@/assets/cosmic-background.png";

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
  const { dialogOpen, currentProduct, processing, startCheckout, handleConfirmCheckout, handleCloseDialog } = useCheckout();

  const handleBuyNow = (offer: typeof offers[0]) => {
    const price = parseInt(offer.price.replace(/[^\d]/g, '')) || 0;
    startCheckout({ 
      name: offer.title, 
      price,
      description: offer.description 
    });
  };

  return (
    <section
      id="offers"
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* ✅ Dim + Soft Glow Overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
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
                  onClick={() => handleBuyNow(offer)}
                  disabled={processing}
                  className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-inter font-semibold transition-all disabled:opacity-50"
                >
                  Buy Now
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
      </div>
      <CheckoutDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        productName={currentProduct?.name || ""}
        price={currentProduct?.price || 0}
        onConfirm={handleConfirmCheckout}
        processing={processing}
      />
    </section>
  );
};

export default FeaturedOffers;
