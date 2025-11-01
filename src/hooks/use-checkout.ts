import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRazorpay } from "./use-razorpay";
import { toast } from "@/hooks/use-toast";

interface BuyerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProductInfo {
  name: string;
  price: number;
  description?: string;
  productId?: string;
}

export function useCheckout() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductInfo | null>(null);
  const [buyerDetails, setBuyerDetails] = useState<BuyerDetails | null>(null);
  const { buyNow, processing } = useRazorpay();

  const startCheckout = async (product: ProductInfo) => {
    // Check inventory if productId is provided
    if (product.productId) {
      const { data: productData, error } = await supabase
        .from("products")
        .select("quantity_available, name")
        .eq("id", product.productId)
        .single();

      if (error) {
        console.error("Error checking inventory:", error);
        toast({
          title: "Error",
          description: "Could not verify product availability. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!productData || productData.quantity_available <= 0) {
        toast({
          title: "Out of Stock",
          description: `${product.name} is currently out of stock.`,
          variant: "destructive",
        });
        return;
      }
    }

    setCurrentProduct(product);
    setDialogOpen(true);
  };

  const handleConfirmCheckout = async (details: BuyerDetails) => {
    if (!currentProduct) return;

    setBuyerDetails(details);

    // Proceed to payment with buyer details
    await buyNow({
      amountInPaise: currentProduct.price * 100,
      name: currentProduct.name,
      description: currentProduct.description,
      buyerDetails: details,
    });

    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentProduct(null);
  };

  return {
    dialogOpen,
    currentProduct,
    processing,
    startCheckout,
    handleConfirmCheckout,
    handleCloseDialog,
  };
}
