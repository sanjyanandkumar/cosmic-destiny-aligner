import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import cosmicWalletImg from "@/assets/cosmic-wallet.jpg";
import cosmicHandbagImg from "@/assets/cosmic-handbag.jpg";
import bg from "@/assets/cosmic-background.png";
import { supabase } from "@/integrations/supabase/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { dialogOpen, currentProduct, processing, startCheckout, handleConfirmCheckout, handleCloseDialog } = useCheckout();

  const products = {
    "cosmic-wallet": {
      name: "Cosmic Wallet",
      price: 400,
      description: "Luxury astro-fashion wallet with cosmic patterns and zodiac symbols.",
      images: [cosmicWalletImg, cosmicWalletImg, cosmicWalletImg],
      details: "This premium wallet is crafted with celestial patterns and zodiac symbols, energetically aligned to enhance your financial flow. Made with high-quality materials and cosmic consciousness.",
      features: [
        "Zodiac-aligned design",
        "Premium materials",
        "Compact and elegant",
        "Energetically charged",
      ],
    },
    "celestial-handbag": {
      name: "Celestial Handbag",
      price: 1000,
      description: "Premium astro-fashion handbag with celestial patterns and star symbols.",
      images: [cosmicHandbagImg, cosmicHandbagImg, cosmicHandbagImg],
      details: "A luxurious handbag designed with celestial patterns and star symbols, crafted to align with your planetary energies. Perfect for the conscious fashionista.",
      features: [
        "Celestial pattern design",
        "Spacious interior",
        "Premium craftsmanship",
        "Cosmic energy alignment",
      ],
    },
  };

  const product = productId ? products[productId as keyof typeof products] : null;

  if (!product) {
    return <Navigate to="/wardrobe" replace />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
	<main
	  className="relative py-24 bg-cover bg-center bg-no-repeat"
	  style={{ backgroundImage: `url(${bg})` }}
	>
	  {/* Dark overlay */}
	  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

	  {/* Page Content */}
	  <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Carousel */}
            <div>
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[500px] overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {product.name}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="mb-8">
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Product</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.details}
                </p>

                <h3 className="text-xl font-bold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                size="lg"
                onClick={async () => {
                  const { data } = await supabase.auth.getUser();

                  // ✅ If not logged in → redirect to login with return-to link
                  if (!data?.user) {
                    window.location.href = `/login?redirect=/wardrobe/${productId}`;
                    return;
                  }

                  // ✅ If logged in → open checkout dialog
                  startCheckout({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                  });
                }}
                disabled={processing}
                className="w-full md:w-auto bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Buy Now - ₹{product.price.toLocaleString()}
              </Button>
            </div>
          </div>
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

export default ProductDetailPage;
