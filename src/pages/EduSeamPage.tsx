import * as React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import careerGuidanceImg from "@/assets/career-guidance.png";
import { useCheckout } from "@/hooks/use-checkout";
import { supabase } from "@/integrations/supabase/client";
import { CheckoutDialog } from "@/components/CheckoutDialog";

const EduSeamPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const {
    dialogOpen,
    currentProduct,
    processing,
    startCheckout,
    handleConfirmCheckout,
    handleCloseDialog,
  } = useCheckout();

  const product = {
    id: "career-guidance",
    name: "Karmic guidance for students’ careers",
    price: 499,
    description:
      "Karmic career guidance to help you discover your unique dharma and translate it into meaningful work.",
    image: careerGuidanceImg,
  };

  const handleCheckout = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      window.location.href = `/login?redirect=/eduseam`;
      return;
    }

    // 🔥 Direct Payment – No Cart
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

      {/* 🌌 EduSeam Section */}
      <section id="eduseam" className="py-24">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
              BrahmaX Gurukul
            </h1>

            <p className="font-inter text-xl text-primary italic mb-6">
              A karmic passport for students’ career goals
            </p>

            <p className="text-2xl font-semibold text-white mb-4">
              Education Reimagined as Evolution.
            </p>

            <div className="max-w-6xl mx-auto">
              <p className="font-inter text-lg text-muted-foreground leading-relaxed px-4">
                BrahmaX Gurukul bridges karmic wisdom with real-world learning. The “Stream Passport” is customized to each student according to his/her birth and karmic chart<br></br>
It clearly highlights which subjects the student has to focus on, academic choices that they need to make, career paths that will align with their karmic destiny – for academic and career success in future!

              </p>
            </div>

          </div>

          {/* Product Card */}
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg transition-all hover:shadow-[0_0_25px_rgba(255,220,120,0.3)]">
              <div className="grid md:grid-cols-2 gap-0 items-stretch">
                <div className="relative h-[420px] md:h-auto overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-8 flex flex-col justify-between bg-transparent">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold mb-3 text-white">
                      {product.name}
                    </h2>

                    <p className="font-inter text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    <ul className="mb-6 space-y-2 text-white/90 text-md">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Subjects that will suit the student</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Which career path to consider</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>How to align interests with divine destiny</span>
                      </li>
                    </ul>

                    <p className="font-playfair text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-6">
                      ₹ {product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* 🛍 Updated Button */}
                  <Button
                    size="lg"
                    onClick={handleCheckout}
                    className="w-full font-semibold bg-primary/20 text-primary hover:bg-primary hover:text-black transition-all"
                  >
                    Consult Gurukul
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
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

export default EduSeamPage;
