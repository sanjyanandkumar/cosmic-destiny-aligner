import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, BookOpen, Plane } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "./CheckoutDialog";
import { useNavigate } from "react-router-dom";
import { requireLogin } from "@/utils/requireLogin";
import CosmicPage from "@/components/CosmicPage";
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
    <CosmicPage>
      <section id="offers" className="py-14 md:py-10">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Offerings
            </h2>
            <p className="font-inter text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
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
                  bg-white/5 backdrop-blur-xl border border-white/15
                  hover:border-white/40 hover:bg-white/10
                  transition-all duration-500 cursor-pointer"
                >
                  <div className="flex flex-col flex-1">
                    {offer.badge && (
                      <Badge className="bg-white/15 text-white border-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-4">
                        {offer.badge}
                      </Badge>
                    )}

                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                      {offer.title}
                    </h3>

                    <p className="font-playfair text-3xl font-semibold tracking-wide 
                    bg-gradient-to-r from-[#E6D8B9] to-[#D9C087] bg-clip-text text-transparent mb-3">
                      {offer.price}
                    </p>

                    <p className="font-inter text-white/70 flex-grow">
                      {offer.description}
                    </p>

                    <Button
                      onClick={() => handleBuyNow(offer)}
                      disabled={processing}
                      className="w-full mt-6 bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20 hover:border-white/60 transition-all"
                    >
                      Buy Now
                    </Button>
                  </div>
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
    </CosmicPage>
  );
};

export default FeaturedOffers;
