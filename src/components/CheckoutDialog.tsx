import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

// Enhanced email validation function matching RFC 5322 standards
const validateEmail = (email: string): boolean => {
  if (!email || email.trim() === "") return false;
  
  // Comprehensive email regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Additional checks
  if (email.length > 255) return false;
  if (email.includes("..")) return false; // No consecutive dots
  if (email.startsWith(".") || email.endsWith(".")) return false; // No leading/trailing dots
  if (email.startsWith("@") || email.endsWith("@")) return false; // No leading/trailing @
  
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  if (parts[0].length > 64) return false; // Local part max 64 chars
  if (parts[1].length > 255) return false; // Domain part max 255 chars
  
  return emailRegex.test(email);
};

// Indian mobile phone validation function
const validateIndianPhone = (phone: string): boolean => {
  if (!phone || phone.trim() === "") return false;
  
  // Remove all spaces and special characters except + and digits
  const cleaned = phone.replace(/\s+/g, "");
  
  // Check if it starts with +91 or 91 and remove country code
  let phoneNumber = cleaned;
  if (cleaned.startsWith("+91")) {
    phoneNumber = cleaned.substring(3);
  } else if (cleaned.startsWith("91") && cleaned.length > 10) {
    phoneNumber = cleaned.substring(2);
  }
  
  // Remove any remaining non-digit characters
  phoneNumber = phoneNumber.replace(/\D/g, "");
  
  // Indian mobile numbers must be exactly 10 digits
  if (phoneNumber.length !== 10) return false;
  
  // Must start with 6, 7, 8, or 9 (Indian mobile number series)
  const firstDigit = phoneNumber.charAt(0);
  if (!["6", "7", "8", "9"].includes(firstDigit)) return false;
  
  // All characters must be digits
  return /^\d{10}$/.test(phoneNumber);
};

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email address is too long")
    .refine((email) => validateEmail(email), {
      message: "Please enter a valid email address",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((phone) => validateIndianPhone(phone), {
      message: "Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)",
    }),
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
    mode: "onBlur", // Validate on blur for better UX
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: CheckoutFormData) => {
    // Additional email validation check before submission
    if (!validateEmail(data.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Additional phone validation check before submission
    if (!validateIndianPhone(data.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive",
      });
      return;
    }
    
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
              className={
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-sm text-destructive mt-1"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder=""
              className={
                errors.phone
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="text-sm text-destructive mt-1"
                role="alert"
              >
                {errors.phone.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Enter 10-digit Indian mobile number (starts with 6, 7, 8, or 9)
            </p>
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
