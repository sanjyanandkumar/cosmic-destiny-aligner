import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, BookOpen, Plane } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "./CheckoutDialog";
import bg from "@/assets/cosmic-background.png";
import { useNavigate } from "react-router-dom";
import { requireLogin } from "@/utils/requireLogin";
import GalaxyBackground from "@/components/GalaxyBackground";

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
  const navigate = useNavigate();

  const handleBuyNow = async (offer: typeof offers[0]) => {
    const user = await requireLogin("/#offers");
    if (!user) return;

    const price = parseInt(offer.price.replace(/[^\d]/g, "")) || 0;
    startCheckout({
      name: offer.title,
      price,
      description: offer.description,
    });
  };

  return (
    <section
      id="offers"
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm"></div>
      <GalaxyBackground className="z-[1]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Offerings
          </h2>
          <p className="font-inter text-lg text-white/70 max-w-2xl mx-auto">
            Choose your path to cosmic alignment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Card
                key={index}
                className="group p-6 relative rounded-2xl 
                bg-white/4 backdrop-blur-xl
                border border-white/15
                hover:border-white/40 hover:bg-white/6
                transition-all duration-500
                shadow-[0_0_0_0_rgba(255,255,255,0.2)]
                hover:shadow-[0_0_30px_4px_rgba(255,255,255,0.12)]
                flex flex-col"
              >
                <div className="lux-spotlight pointer-events-none"></div>
                  <div className="relative flex-1">
                    <div className="lux-inner card-luxury-shine p-6 rounded-2xl space-y-4">
                  {offer.badge && (
                    <Badge className="bg-white/15 text-white border-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {offer.badge}
                    </Badge>
                  )}

                  <div className="w-14 h-14 rounded-full 
                    bg-gradient-to-br from-white/25 to-white/5 
                    backdrop-blur-xl border border-white/30 
                    flex items-center justify-center 
                    group-hover:border-white/60 transition-all duration-400">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <div>
                    <h3 className="font-playfair text-2xl font-semibold text-white mb-1">
                      {offer.title}
                    </h3>

                    <p className="font-playfair text-3xl font-semibold tracking-wide 
                      bg-gradient-to-r from-[#E6D8B9] to-[#D9C087] bg-clip-text text-transparent mb-3">
                      {offer.price}
                    </p>

                    <p className="font-inter text-white/70">
                      {offer.description}
                    </p>
                  </div>
                </div>
                </div>

                <Button
                  onClick={() => handleBuyNow(offer)}
                  disabled={processing}
                  className="w-full mt-6 
                  bg-gradient-to-r from-white/10 to-white/5 
                  backdrop-blur-xl border border-white/30 
                  text-white tracking-wide 
                  hover:from-white/20 hover:to-white/10 hover:border-white/70 
                  transition-all duration-400"
                >
                  Buy Now
                </Button>
              </Card>
            );
          })}
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
