import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import cosmicWalletImg from "@/assets/cosmic-wallet.jpg";
import cosmicHandbagImg from "@/assets/cosmic-handbag.jpg";
import bg from "@/assets/cosmic-background.png";
import GalaxyBackground from "@/components/GalaxyBackground";

const WardrobePage = () => {
  const products = [
    {
      id: "cosmic-wallet",
      name: "Cosmic Wallet",
      price: 400,
      description: "Luxury astro-fashion wallet with cosmic patterns and zodiac symbols.",
      image: cosmicWalletImg,
    },
    {
      id: "celestial-handbag",
      name: "Celestial Handbag",
      price: 1000,
      description: "Premium astro-fashion handbag with celestial patterns and star symbols.",
      image: cosmicHandbagImg,
    },
  ];

  return (
    <div className="min-h-screen font-inter">
      <Navigation />

      {/* ✅ Cosmic Background Section */}
      <main
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm"></div>
        <GalaxyBackground className="z-[1]" />
        <div className="relative z-10 container mx-auto px-4">

          {/* Header Text */}
          <div className="text-center mb-14 max-w-4xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-foreground mb-4">
              BrahmaX Wardrobe
            </h1>
            <p className="text-xl text-primary italic mb-6">
              The Astro-Fashion Division
            </p>

            <p className="text-2xl font-semibold text-foreground mb-4">
              Wear Your Planets. Live Your Power.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A fashion system aligned with your zodiac, lagna, and planetary energies.
              Every piece is a vibrational tool — blending design, astrology, and sacred intention.
            </p>

            <p className="mt-4 text-lg italic text-primary">
              “Style that heals. Luxury that vibrates.”
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {products.map((product) => (
              <Link key={product.id} to={`/wardrobe/${product.id}`} className="block group">
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
                    <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="font-playfair text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WardrobePage;
