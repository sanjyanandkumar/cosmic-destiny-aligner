import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import baliTripImg from "@/assets/bali-trip.jpg";
import karmicMeditationImg from "@/assets/karmic-meditation.jpg";
import bg from "@/assets/cosmic-background.png";
import { supabase } from "@/integrations/supabase/client";
import { requireLogin } from "@/utils/requireLogin";

const LeisurePage = () => {
  const { dialogOpen, currentProduct, processing, startCheckout, handleConfirmCheckout, handleCloseDialog } = useCheckout();

  const products = [
    {
      name: "Bali Wellness Retreat",
      price: 50000,
      description: "Luxurious karmic wellness retreat in Bali with spiritual temples and cosmic energy experiences.",
      image: baliTripImg,
    },
    {
      name: "Customized Karmic Meditation",
      price: 2000,
      description: "Personalized karmic meditation session designed to realign your energy and restore divine frequency.",
      image: karmicMeditationImg,
    },
  ];

  return (
    <div className="min-h-screen font-inter">
      <Navigation />

      {/* ✅ Cosmic Background */}
      <main
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Soft golden-black overlay */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm"></div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h1 className="font-playfair text-5xl font-bold text-foreground mb-4">
              BrahmaX Leisure
            </h1>

            <p className="text-xl text-primary italic mb-6">
              The Karmic Wellness Division
            </p>

            <p className="text-2xl font-semibold text-foreground mb-4">
              Relaxation, Realigned.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              BrahmaX Leisure redefines luxury wellness through the science of karma.
              Retreats, meditation sanctuaries, spiritual travel & celestial cafés —
              designed for energetic reset and divine alignment.
            </p>

            <p className="mt-4 text-lg italic text-primary">
              “Wellness isn’t an escape — it’s a return to your divine frequency.”
            </p>
          </div>

          {/* ✅ Product Cards */}
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {products.map((product) => (
              <Card
                key={product.name}
                className="overflow-hidden backdrop-blur-md bg-card/30 border border-cosmic-blue/40 hover:border-primary/60 shadow-xl hover:shadow-[0_0_30px_rgba(255,220,120,0.4)] transition-all duration-500"
              >
                <div className="relative h-[320px]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-8">
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
                    {product.name}
                  </h2>

                  <p className="font-inter text-muted-foreground mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <p className="font-playfair text-4xl font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent">
                    ₹{product.price.toLocaleString()}
                  </p>

                  <Button
                    size="lg"
                    onClick={async () => {
                    const user = await requireLogin("/leisure");
                    if (!user) return;

                    startCheckout({ name: product.name, price: product.price, description: product.description });
                  }}
                  disabled={processing}
                  className="w-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Book Experience
                </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <CheckoutDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        productName={currentProduct?.name || ""}
        price={currentProduct?.price || 0}
        onConfirm={handleConfirmCheckout}
        processing={processing}
      />
    </div>
  );
};

export default LeisurePage;
