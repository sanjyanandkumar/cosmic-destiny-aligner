import * as React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import cosmicWalletImg from "@/assets/cosmic-wallet.jpg";
import cosmicHandbagImg from "@/assets/cosmic-handbag.jpg";
import CosmicPage from "@/components/CosmicPage";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const WardrobePage: React.FC = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: "cosmic-wallet",
      name: "Cosmic Wallet",
      price: 400,
      description:
        "Luxury astro-fashion wallet with cosmic patterns and zodiac symbols.",
      image: cosmicWalletImg,
    },
    {
      id: "celestial-handbag",
      name: "Celestial Handbag",
      price: 1000,
      description:
        "Premium astro-fashion handbag with celestial patterns and star symbols.",
      image: cosmicHandbagImg,
    },
  ];

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

              <p className="font-inter text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4">
                Style that heals. Luxury that vibrates
              </p>
            </div>

            {/* --- Products --- */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-10">
                {products.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/wardrobe/${product.id}`} className="block">
                      <Card
                        className="overflow-hidden border border-cosmic-blue/30 bg-card/30 backdrop-blur-md 
                        hover:border-primary/60 hover:shadow-[0_0_25px_rgba(255,220,120,0.4)]
                        transition-all duration-500 cursor-pointer"
                      >
                        <div className="relative h-[320px] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <div className="p-6">
                          <h2 className="font-playfair text-2xl font-bold text-white mb-2">
                            {product.name}
                          </h2>
                          <p className="mb-4 text-muted-foreground leading-relaxed">
                            {product.description}
                          </p>

                          <p className="font-playfair text-3xl mb-4">
                            <span className="text-white mr-1">₹</span>
                            <span className="bg-gradient-gold bg-clip-text text-transparent">
                              {product.price.toLocaleString()}
                            </span>
                          </p>

                          {/* ⭐ Add To Cart Button */}
                          <div className="flex justify-center mt-2">
                            <Button
                              onClick={(e) => {
                                e.preventDefault(); // prevents navigation

                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  quantity: 1,
                                  image_url: product.image,
                                  category: "Wardrobe",
                                });

                                toast({
                                  title: "Added to Cart!",
                                  description: `${product.name} has been added to your cart.`,
                                });
                              }}
                              className="
                                mt-4
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
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
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
