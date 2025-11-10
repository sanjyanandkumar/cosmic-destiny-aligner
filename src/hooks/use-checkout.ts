import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const startCheckout = (product: { name: string; price: number; description: string }) => {
    setCurrentProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmCheckout = async () => {
    if (!currentProduct) return;

    setProcessing(true);

    try {
      // ✅ Get the logged-in user session
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Login Required", description: "Please log in to continue.", variant: "destructive" });
        navigate("/login");
        return;
      }

      // ✅ Create Order (Completed Immediately — TEST MODE)
      const { data: orderData, error: orderErr } = await supabase
        .from("orders")
        .insert({
          order_number: `ORD-${Date.now()}`,
          buyer_name: user.user_metadata?.full_name || "Customer",
          buyer_email: user.email,
          buyer_phone: null,
          total_amount: currentProduct.price * 100, // paise
          status: "completed", // ✅ Skip payment, mark complete
          razorpay_payment_id: null,
        })
        .select()
        .single();

      if (orderErr) {
        toast({ title: "Order Failed", description: orderErr.message, variant: "destructive" });
        return;
      }

      // ✅ Insert Order Item
      await supabase.from("order_items").insert({
        order_id: orderData.id,
        product_id: currentProduct.name,
        price_at_purchase: currentProduct.price,
        quantity: 1,
      });

      toast({
        title: "Order Placed (Test Mode)",
        description: "Order successfully created without payment.",
      });

      handleCloseDialog();

      // Optionally redirect to Orders page
      navigate("/orders");

    } catch (err: any) {
      console.error(err);
      toast({ title: "Order Failed", description: "Unexpected error occurred.", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
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