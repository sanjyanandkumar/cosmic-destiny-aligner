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
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
              BrahmaX Karmic Consulting
            </h1>

            <p className="text-2xl font-semibold text-white mb-4">
              Scaling destiny, not just business.
            </p>

            <div className="max-w-6xl mx-auto">
              <p className="font-inter text-lg text-muted-foreground leading-relaxed px-4">
                Begin your journey with the foundation — your karmic blueprint.
                This consulting experience decodes planetary timing, personality
                alignment, and karmic direction to help you make decisions with clarity and confidence.
              </p>
            </div>

            <p className="mt-4 text-lg italic text-primary">
              “Your destiny has a design. We help you read it.”
            </p>
          </div>

          {/* Product Card */}
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg transition-all hover:shadow-[0_0_25px_rgba(255,220,120,0.3)]">
              <div className="grid md:grid-cols-2 gap-0 items-stretch">
                
                {/* Image */}
                <div className="relative h-[420px] md:h-auto overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between bg-transparent">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold mb-3 text-white">
                      {product.name}
                    </h2>

                    <p className="font-inter text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    <ul className="mb-6 space-y-2 text-white/90 text-sm">
                      <li>• Personal karmic chart reading</li>
                      <li>• Destiny discovery session</li>
                      <li>• Personality-fit analysis</li>
                    </ul>

                    <p className="font-playfair text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-6">
                      ₹ {product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* 🔥 Checkout Button (identical behavior to EduSeam) */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="
                        inline-flex items-center justify-center
                        w-[200px]           /* 👈 SAME visual width as Hero */
                        px-6 py-3
                        font-bold
                        rounded-lg
                        bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                        text-black
                        shadow-lg
                        hover:scale-110 transition-transform
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
              className="text-primary text-lg underline hover:text-primary/70 transition-all"
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
