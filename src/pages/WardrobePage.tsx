import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CosmicPage from "@/components/CosmicPage";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const WardrobePage: React.FC = () => {
  const { addToCart } = useCart();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "wardrobe"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "wardrobe")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <CosmicPage>
      <Navigation />

      {/* 🌠 Match About page tone */}
      <section id="wardrobe" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-14">
              <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
                BrahmaX Wardrobe
              </h1>

              <p className="font-inter text-xl text-primary italic mb-6">
                The Astro-Fashion Division
              </p>

              <p className="text-2xl font-semibold text-foreground mb-4">
                Wear Your Planets. Live Your Power.
              </p>

              <p className="font-inter text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                A fashion system aligned with your zodiac, lagna, and planetary energies.
                Every piece is a vibrational tool — blending design, astrology, and sacred intention.
              </p>

              <p className="mt-4 text-lg italic text-primary">
                “Style that heals. Luxury that vibrates.”
              </p>
            </div>

            {/* Product section */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8">
              {isLoading ? (
                <div className="text-center py-12 text-white">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 text-white">No products available yet.</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-10">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden border border-cosmic-blue/30 bg-card/30 backdrop-blur-md 
                      hover:border-primary/60 hover:shadow-[0_0_25px_rgba(255,220,120,0.4)]
                      transition-all duration-500"
                    >
                      <div className="relative h-[320px] overflow-hidden">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="p-6">
                        <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">
                          {product.name}
                        </h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {product.description}
                        </p>
                        <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
                          ₹{product.price.toLocaleString()}
                        </p>
                        <Button
                          onClick={() => addToCart(product)}
                          className="w-full"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default WardrobePage;
