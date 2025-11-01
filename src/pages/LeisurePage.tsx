import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import baliTripImg from "@/assets/bali-trip.jpg";
import karmicMeditationImg from "@/assets/karmic-meditation.jpg";

const LeisurePage = () => {
  const { dialogOpen, currentProduct, processing, startCheckout, handleConfirmCheckout, handleCloseDialog } = useCheckout();

  const products = [
    {
      name: "Bali Wellness Retreat",
      price: 50000,
      description: "Luxurious karmic wellness retreat in Bali with spiritual temples and cosmic energy experiences.",
      image: baliTripImg,
    },
    {
      name: "Customized Karmic Meditation",
      price: 2000,
      description: "Personalized karmic meditation session designed to realign your energy and restore divine frequency.",
      image: karmicMeditationImg,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            BrahmaX Leisure
          </h1>
          <p className="text-xl text-muted-foreground">The Karmic Wellness Division</p>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Relaxation, Realigned. BrahmaX Leisure redefines luxury wellness through the lens of karma, creating transformational environments where the soul can rest, realign, and rejuvenate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Card key={product.name} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <p className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </p>
                <Button
                  size="lg"
                  onClick={() => startCheckout({ name: product.name, price: product.price, description: product.description })}
                  disabled={processing}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </div>
            </Card>
          ))}
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

export default LeisurePage;
