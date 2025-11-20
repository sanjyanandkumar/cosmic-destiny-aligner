import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const EduSeamPage: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "eduseam"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "eduseam")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = async (product: any) => {
    const { data, error } = await supabase.auth.getSession();

    if (!data?.session) {
      toast({
        title: "Please Login",
        description: "You need to login before you can continue.",
      });
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    addToCart(product);
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
              EduSeam
            </h1>

            <p className="font-inter text-xl text-primary italic mb-6">
              The Passport to Conscious Learning
            </p>

            <p className="text-2xl font-semibold text-foreground mb-4">
              Education Reimagined as Evolution.
            </p>

            {/* ✅ Paragraph widened and detached from narrow parent */}
            <div className="max-w-6xl mx-auto">
              <p className="font-inter text-lg text-muted-foreground leading-relaxed px-4">
                EduSeam bridges karmic wisdom with real-world learning. The “Passport Concept”
                allows you to journey through subjects — astrology, global culture, branding,
                business, and purpose — to discover your true <em>dharma</em> through experience
                and expansion.
              </p>
            </div>

            <p className="mt-4 text-lg italic text-primary">
              “We don’t teach — we awaken.”
            </p>
          </div>

          {/* Product Card */}
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12 text-white">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-white">No products available yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-10">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg transition-all hover:shadow-[0_0_25px_rgba(255,220,120,0.3)]"
                  >
                    <div className="grid md:grid-cols-1 gap-0 items-stretch">
                      <div className="relative h-[320px] overflow-hidden">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="p-6">
                        <h2 className="font-playfair text-2xl font-bold mb-2 text-white">
                          {product.name}
                        </h2>

                        <p className="font-inter text-muted-foreground mb-4 leading-relaxed">
                          {product.description}
                        </p>

                        <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
                          ₹{product.price.toLocaleString()}
                        </p>

                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default EduSeamPage;
