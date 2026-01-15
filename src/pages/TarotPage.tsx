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

const TarotPage: React.FC = () => {
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
      <section id="eduseam" className="py-20">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="max-w-6xl mx-auto text-center mb-2">
            <h1 className="font-playfair text-5xl font-bold text-white mb-2 leading-tight">
              BrahmaX Gurukul
            </h1>

            <p className="font-inter text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
              A karmic passport for students’ career goals
            </p>

            <div className="max-w-6xl mx-auto">
              <p className="font-inter text-lg text-white leading-relaxed px-4 text-justify mb-8">
                BrahmaX Gurukul bridges karmic wisdom with real-world learning. The “Stream Passport” is customized to each student according to his/her birth and karmic chart.
It clearly highlights which subjects the student has to focus on, academic choices that they need to make, career paths that will align with their karmic destiny – for academic and career success in future!
              </p>
            </div>

          </div>

          {/* Product Card */}
          <div className="max-w-4xl mx-auto">
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

                    <p className="font-playfair text-3xl mb-6">
                      <span className="text-white mr-1">₹</span>
                      <span className="bg-gradient-gold bg-clip-text text-transparent">
                        {product.price.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleCheckout}
                      className="
                        w-[170px]
                        inline-block font-bold
                        px-8 py-2
                        rounded-lg
                        bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                        text-black shadow-lg
                        hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                        transition-all
                      "
                    >
                      Consult NOW
                    </Button>
                  </div>
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

export default TarotPage;
