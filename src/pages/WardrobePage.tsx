import * as React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CosmicPage from "@/components/CosmicPage";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const WardrobePage: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          description,
          product_images (
            image_url,
            sort_order
          )
        `)
        .eq("category", "wardrobe");

      if (error) {
        console.error("Failed to load products:", error);
        return;
      }

      const normalized =
        (data || []).map((p: any) => ({
          ...p,
          product_images: (p.product_images || []).sort(
            (a: any, b: any) => a.sort_order - b.sort_order
          ),
        }));

      setProducts(normalized);
    };
    console.log("Entered loading");
    loadProducts();
  }, []);

  return (
    <CosmicPage>
      <Navigation />

      <section id="wardrobe" className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* --- Heading Section --- */}
            <div className="text-center mb-8">
              <h1 className="font-playfair text-5xl font-bold text-white mb-4 leading-tight">
                BrahmaX Wardrobe
              </h1>

              <p className="font-inter text-muted-foreground text-2xl italic mb-4">
                World’s first karmic fashion and lifestyle platform
              </p>

              <p className="font-inter text-lg text-white leading-relaxed max-w-4xl mx-auto">
                A fashion system aligned with your zodiac, lagna, and planetary energies. Every piece is a vibrational tool — blending design, astrology, and sacred intention.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8">
              <div className="grid md:grid-cols-3 gap-10">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/wardrobe/${product.id}`}
                    className="block"
                  >
                    <Card className="overflow-hidden border border-cosmic-blue/30 bg-card/30 backdrop-blur-md 
                        hover:border-primary/60 hover:shadow-[0_0_25px_rgba(255,220,120,0.4)]
                        transition-all duration-500 cursor-pointer">
                      <div className="relative h-[320px] overflow-hidden">
                        {product.product_images?.[0] && (
                          <img
                            src={product.product_images[0].image_url}
                            alt={product.name}
                            className="h-[320px] w-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {product.name}
                        </h2>

                        <p className="text-muted-foreground mb-4">
                          {product.description}
                        </p>

                        <p className="font-playfair text-3xl mb-4">
                            <span className="text-white mr-1">₹</span>
                            <span className="bg-gradient-gold bg-clip-text text-transparent">
                              {product.price.toLocaleString()}
                            </span>
                        </p>

                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
};

export default WardrobePage;
