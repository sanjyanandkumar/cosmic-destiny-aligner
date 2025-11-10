import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import bg from "@/assets/cosmic-background.png";
import { supabase } from "@/integrations/supabase/client";
import { requireLogin } from "@/utils/requireLogin";
import GalaxyBackground from "@/components/GalaxyBackground";

const ConsultingPage = () => {
  const { dialogOpen, currentProduct, processing, startCheckout, handleConfirmCheckout, handleCloseDialog } = useCheckout();

  const product = {
    name: "Karmic Consulting",
    price: 2000,
    description: "Unlock the hidden timing and energy behind your ventures with our karmic business consulting.",
    image: karmicConsultingImg,
  };

  return (
    <div className="min-h-screen bg-transparent font-inter">
      <Navigation />
		<main
		  className="relative py-24 bg-cover bg-center bg-no-repeat"
		  style={{ backgroundImage: `url(${bg})` }}
		>
		  <div className="absolute inset-0 bg-black/45 backdrop-blur-sm"></div>
      <GalaxyBackground className="z-[1]" />
		  <div className="relative z-10 container mx-auto px-4">
		<div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            BrahmaX Consulting
          </h1>
          <p className="text-xl text-muted-foreground">The Karmic Business Division</p>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Scaling Destiny, Not Just Business. We help founders, investors, and creators unlock the hidden timing and energy behind their ventures using astrological intelligence, cosmic strategy, and karmic analytics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <p className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={async () => {
                    const user = await requireLogin("/consulting");
                    if (!user) return;

                      startCheckout(product);
                    }}
                    disabled={processing}
                    className="w-full"
                  >
                    Book Session
                  </Button>
              </div>
            </div>
          </Card>
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

export default ConsultingPage;
