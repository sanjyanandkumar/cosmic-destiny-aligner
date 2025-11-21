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

      <section id="wardrobe" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* --- Heading Section --- */}
            <div className="text-center mb-14">
              <h1 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
                BrahmaX Wardrobe
              </h1>

              <p className="font-inter text-xl text-primary italic mb-6">
                The Astro-Fashion Division
              </p>

              <p className="text-2xl font-semibold text-white mb-4">
                Wear Your Planets. Live Your Power.
              </p>

              <p className="font-inter text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
                A fashion system aligned with your zodiac, lagna, and planetary energies.
                Every piece is a vibrational tool — blending design, astrology, and sacred intention.
              </p>

              <p className="mt-4 text-lg italic text-primary">
                “Style that heals. Luxury that vibrates.”
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
                          <p className="text-white/70 mb-4 leading-relaxed">
                            {product.description}
                          </p>

                          <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                            ₹{product.price.toLocaleString()}
                          </p>

                          {/* ⭐ Add To Cart Button */}
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
                            className="mt-4 w-full bg-primary/20 text-primary hover:bg-primary hover:text-black transition-all"
                          >
                            Add to Cart
                          </Button>
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
