import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CosmicPage from "@/components/CosmicPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const ConsultingPage: React.FC = () => {
  const { addToCart } = useCart();
  
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["products", "consulting"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "consulting")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <CosmicPage>
      <Navigation />

      <section id="consulting" className="py-24">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-playfair text-5xl font-bold text-white mb-4 leading-tight">
              BrahmaX Consulting
            </h1>
            <p className="font-inter text-xl text-primary italic mb-6">
              The Karmic Business Division
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Scaling destiny, not just business. Each consulting stage decodes, designs,
              and aligns your venture with your karmic frequency — from blueprint to branding to growth.
            </p>
          </div>

          {/* Services Grid */}
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12 text-white">Loading services...</div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 text-white">No services available yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-10">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:border-primary/60 transition-all duration-500"
                  >
                    <div className="relative h-[260px] overflow-hidden">
                      <img
                        src={service.image_url || "/placeholder.svg"}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
                        ₹{service.price.toLocaleString()}
                      </p>
                      <Button
                        onClick={() => addToCart(service)}
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
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default ConsultingPage;
