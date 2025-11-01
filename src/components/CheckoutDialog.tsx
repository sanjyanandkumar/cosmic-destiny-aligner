import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(15, "Phone too long"),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(500, "Address too long"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  price: number;
  onConfirm: (buyerDetails: CheckoutFormData) => void;
  processing: boolean;
}

export const CheckoutDialog = ({
  open,
  onOpenChange,
  productName,
  price,
  onConfirm,
  processing,
}: CheckoutDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    onConfirm(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Product: {productName}</p>
          <p className="text-lg font-bold text-primary">₹{price.toLocaleString()}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+91 XXXXXXXXXX"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Shipping Address *</Label>
            <Textarea
              id="address"
              {...register("address")}
              placeholder="Enter your complete shipping address"
              className={errors.address ? "border-destructive" : ""}
              rows={3}
            />
            {errors.address && (
              <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={processing}>
            {processing ? "Processing..." : "Proceed to Payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
