import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import careerGuidanceImg from "@/assets/career-guidance.jpg";
import bg from "@/assets/cosmic-background.png";

const EduSeamPage = () => {
  const { dialogOpen, currentProduct, processing, startCheckout, handleConfirmCheckout, handleCloseDialog } = useCheckout();

  const product = {
    name: "Career Guidance",
    price: 1000,
    description: "Karmic career guidance to help you discover your unique dharma and translate it into meaningful work.",
    image: careerGuidanceImg,
  };

  return (
    <div className="min-h-screen font-inter">
      <Navigation />

      {/* ✅ Cosmic Background */}
      <main
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Dim overlay */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="mb-14 text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-foreground mb-4">
              EduSeam
            </h1>

            <p className="text-xl text-primary italic mb-6">
              The Passport to Conscious Learning
            </p>

            <p className="text-2xl font-semibold text-foreground mb-4">
              Education Reimagined as Evolution.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              EduSeam bridges karmic wisdom with real-world learning. The “Passport Concept”
              allows you to journey through subjects — astrology, global culture, branding,
              business, purpose — to discover your true *dharma* through experience and expansion.
            </p>

            <p className="mt-4 text-lg italic text-primary">
              “We don’t teach — we awaken.”
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden backdrop-blur-md bg-card/30 border border-cosmic-blue/40 hover:border-primary/60 shadow-xl hover:shadow-[0_0_30px_rgba(255,220,120,0.4)] transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[420px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold mb-3 text-foreground">
                      {product.name}
                    </h2>

                    <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <p className="font-playfair text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-6">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>

                  <Button
                    size="lg"
                    onClick={() =>
                      startCheckout({
                        name: product.name,
                        price: product.price,
                        description: product.description,
                      })
                    }
                    disabled={processing}
                    className="w-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Begin Your Path
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      <CheckoutDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        productName={currentProduct?.name || ""}
        price={currentProduct?.price || 0}
        onConfirm={handleConfirmCheckout}
        processing={processing}
      />
    </div>
  );
};

export default EduSeamPage;
