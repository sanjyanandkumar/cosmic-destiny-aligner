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

const LeisurePage: React.FC = () => {
  const { addToCart } = useCart();
  
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["products", "leisure"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "leisure")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <CosmicPage>
      <Navigation />

      <section id="leisure" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-14">
              <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
                BrahmaX Leisure
              </h1>

              <p className="font-inter text-xl text-primary italic mb-6">
                The Karmic Wellness Division
              </p>

              <p className="text-2xl font-semibold text-foreground mb-4">
                Relaxation, Realigned.
              </p>

              <p className="font-inter text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                BrahmaX Leisure curates divine experiences through travel, meditation,
                and cosmic realignment. Each offering is designed to restore spiritual harmony,
                awaken planetary consciousness, and return you to your divine rhythm.
              </p>

              <p className="mt-4 text-lg italic text-primary">
                "Wellness isn't an escape — it's a return to your cosmic essence."
              </p>
            </div>

            {/* Experiences Grid */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8">
              {isLoading ? (
                <div className="text-center py-12 text-white">Loading experiences...</div>
              ) : experiences.length === 0 ? (
                <div className="text-center py-12 text-white">No experiences available yet.</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {experiences.map((exp) => (
                    <Card
                      key={exp.id}
                      className="overflow-hidden border border-cosmic-blue/30 bg-card/30 backdrop-blur-md 
                      hover:border-primary/60 hover:shadow-[0_0_25px_rgba(255,220,120,0.4)]
                      transition-all duration-500"
                    >
                      <div className="relative h-[320px] overflow-hidden">
                        <img
                          src={exp.image_url || "/placeholder.svg"}
                          alt={exp.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="p-6">
                        <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">
                          {exp.name}
                        </h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                        <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
                          ₹{exp.price.toLocaleString()}
                        </p>
                        <Button
                          onClick={() => addToCart(exp)}
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

export default LeisurePage;
