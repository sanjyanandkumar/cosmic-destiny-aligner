import * as React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import { useCheckout } from "@/hooks/use-checkout";
import { supabase } from "@/integrations/supabase/client";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { Link } from "react-router-dom";

const ConsultingPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    dialogOpen,
    currentProduct,
    processing,
    startCheckout,
    handleConfirmCheckout,
    handleCloseDialog,
  } = useCheckout();

  const product = {
    id: "karmic-reading",
    name: "Karmic Reading",
    price: 999,
    description:
      "Understand your karmic purpose, how your birth chart influences your destiny, and planetary timings that determine your success in life.",
    image: karmicConsultingImg,
  };

  const handleCheckout = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      window.location.href = `/login?redirect=/consulting`;
      return;
    }

    // 🔥 Direct checkout (same as EduSeam)
    startCheckout({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <CosmicPage>
      <Navigation />

      {/* 🌌 Consulting Section */}
      <section id="consulting" className="py-24">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="max-w-6xl mx-auto text-center mb-6">
            <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
              BrahmaX Karmic Consulting
            </h1>

            <div className="max-w-6xl mx-auto">
              <p className="font-inter text-lg text-muted-foreground leading-relaxed px-4">
                Know your karmic blueprint; Change your destiny…
              </p>
            </div>

          </div>

          {/* Product Card */}
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg transition-all hover:shadow-[0_0_25px_rgba(255,220,120,0.3)]">
              <div className="grid md:grid-cols-2 gap-0 items-stretch">
                
                {/* Image */}
                <div className="relative h-[380px] md:h-auto overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover scale-[0.9] transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between bg-transparent">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold mb-3 text-white">
                      {product.name}
                    </h2>

                    <p className="font-inter text-muted-foreground mb-4 leading-relaxed text-justify">
                      {product.description}
                    </p>

                    <ul className="mb-6 space-y-2 text-white/90 text-sm">
                      <li>• Personal karmic chart reading</li>
                      <li>• Destiny discovery session</li>
                      <li>• Personality-fit analysis</li>
                    </ul>

                    <p className="font-playfair text-3xl mb-6">
                      <span className="text-white mr-1">₹</span>
                      <span className="bg-gradient-gold bg-clip-text text-transparent">
                        {product.price.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {/* 🔥 Checkout Button (identical behavior to EduSeam) */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="
                        inline-block font-bold
                        px-8 py-2
                        rounded-lg
                        bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                        text-black shadow-lg
                        hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                        transition-all
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                    >
                      {processing ? "Processing..." : "Consult NOW"}
                    </Button>
                  </div>
                </div>

              </div>
            </Card>
          </div>
          {/* Link to Additional Programs */}
          <div className="text-center mt-6">
            <Link
              to="/consulting/additional"
              className="text-white text-lg underline hover:text-primary/70 transition-all"
            >
              More Consulting Services →
            </Link>
          </div>

        </div>
      </section>

      <Footer />

      {/* ✅ Checkout Dialog (same as EduSeam) */}
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
