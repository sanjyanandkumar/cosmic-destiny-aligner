import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { supabase } from "@/integrations/supabase/client";
import CosmicPage from "@/components/CosmicPage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {
    dialogOpen,
    currentProduct,
    processing,
    startCheckout,
    handleConfirmCheckout,
    handleCloseDialog,
  } = useCheckout();

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          description,
          details,
          quantity_available,
          product_images (
            image_url,
            sort_order
          ),
          product_features (
            feature
          )
        `)
        .eq("id", productId)
        .single();

      if (error || !data) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct({
        ...data,
        product_images: (data.product_images || []).sort(
          (a: any, b: any) => a.sort_order - b.sort_order
        ),
        product_features: data.product_features || [],
      });

      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <CosmicPage>
        <Navigation />
        <div className="pt-24 text-center text-white">
          Loading product…
        </div>
        <Footer />
      </CosmicPage>
    );
  }

  /* ---------------- NOT FOUND ---------------- */

  if (!product) {
    return <Navigate to="/wardrobe" replace />;
  }

  const outOfStock = product.quantity_available <= 0;

  return (
    <CosmicPage>
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">

            {/* -------- Image Carousel -------- */}
            <Carousel>
              <CarouselContent>
                {product.product_images.length > 0 ? (
                  product.product_images.map((img: any, i: number) => (
                    <CarouselItem key={i}>
                      <div className="relative h-[500px] overflow-hidden rounded-lg">
                        <img
                          src={img.image_url}
                          alt={`${product.name} image ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="h-[500px] flex items-center justify-center bg-black/20 text-white">
                      No images available
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* -------- Product Details -------- */}
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {product.name}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="mb-6">
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ₹{product.price}
                </p>

                <p
                  className={`mt-2 text-sm font-semibold ${
                    outOfStock ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {outOfStock
                    ? "Out of Stock"
                    : `In Stock (${product.quantity_available} available)`}
                </p>
              </div>

              {/* -------- Details -------- */}
              {product.details && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    About This Product
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.details}
                  </p>
                </div>
              )}

              {/* -------- Features -------- */}
              {product.product_features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {product.product_features.map((f: any, i: number) => (
                      <li
                        key={i}
                        className="flex items-center text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* -------- Buy Button -------- */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() =>
                    startCheckout({
                      name: product.name,
                      price: product.price,
                      description: product.description,
                    })
                  }
                  disabled={processing || outOfStock}
                  className="
                    w-[170px]
                    inline-block font-bold
                    px-8 py-2
                    rounded-lg
                    bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                    text-black shadow-lg
                    hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                    transition-all
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {processing
                    ? "Processing…"
                    : outOfStock
                    ? "Out of Stock"
                    : "Buy NOW"}
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
    </CosmicPage>
  );
};

export default ProductDetailPage;
