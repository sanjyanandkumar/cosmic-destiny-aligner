import * as React from "react";
import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import { requireLogin } from "@/utils/requireLogin";

const ConsultingPage: React.FC = () => {
  const {
    dialogOpen,
    currentProduct,
    processing,
    startCheckout,
    handleConfirmCheckout,
    handleCloseDialog,
  } = useCheckout();

  const product = {
    name: "Karmic Consulting",
    price: 2000,
    description:
      "Unlock the hidden timing and energy behind your ventures with our karmic business consulting.",
    image: karmicConsultingImg,
  };

  return (
    <CosmicPage>
      <Navigation />

      {/* 🌠 Content Section - same layout tone as About */}
      <section id="consulting" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-playfair text-5xl font-bold text-white mb-4 leading-tight">
              BrahmaX Consulting
            </h1>
            <p className="font-inter text-xl text-primary italic mb-6">
              The Karmic Business Division
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Scaling destiny, not just business. We help founders, investors, and creators
              unlock the hidden timing and energy behind their ventures using astrological intelligence,
              cosmic strategy, and karmic analytics.
            </p>
          </div>

          {/* 🌑 Consulting Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6 flex flex-col justify-between text-left">
                <div>
                  <h2 className="text-3xl font-playfair font-bold text-white mb-4">
                    {product.name}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="font-playfair text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent">
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
                  className="w-full mt-6"
                >
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* 💳 Checkout Dialog */}
      <CheckoutDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        productName={currentProduct?.name || ""}
        price={currentProduct?.price || 0}
        onConfirm={handleConfirmCheckout}
        processing={processing}
      />
    </CosmicPage>
  );
};

export default ConsultingPage;
