import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import careerGuidanceImg from "@/assets/career-guidance.jpg";

const EduSeamPage = () => {
  const { dialogOpen, currentProduct, processing, startCheckout, handleConfirmCheckout, handleCloseDialog } = useCheckout();

  const product = {
    name: "Career Guidance",
    price: 1000,
    description: "Karmic career guidance to help you discover your unique dharma and translate it into meaningful work.",
    image: careerGuidanceImg,
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            EduSeam
          </h1>
          <p className="text-xl text-muted-foreground">The Passport to Conscious Learning</p>
          <p className="mt-6 text-2xl font-semibold max-w-3xl mx-auto">
            Education Reimagined as Evolution.
          </p>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            EduSeam is the learning and mentorship wing of BrahmaX, designed to bridge karmic awareness with real-world knowledge. Its flagship “Passport Concept” empowers individuals to travel through subjects — from astrology and branding to global culture and purpose-driven entrepreneurship. Each course is an initiation — a journey into discovering one’s unique dharma and how to translate it into meaningful work.
          </p>
          <p className="mt-4 text-lg italic text-primary">“We don’t teach — we awaken.”</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <p className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              <Button
                size="lg"
                onClick={() => startCheckout({ name: product.name, price: product.price, description: product.description })}
                disabled={processing}
                className="w-full"
              >
                Buy Now
              </Button>
              </div>
            </div>
          </Card>
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
