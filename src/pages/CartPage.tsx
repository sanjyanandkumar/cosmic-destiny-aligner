import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <CosmicPage>
        <Navigation />
        <div className="container mx-auto px-4 py-32 min-h-[60vh] flex flex-col items-center justify-center">
          <ShoppingCart className="h-24 w-24 text-muted-foreground mb-6" />
          <h1 className="text-4xl font-playfair font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some cosmic products to get started!</p>
          <Button onClick={() => navigate("/wardrobe")} size="lg">
            Browse Products
          </Button>
        </div>
        <Footer />
      </CosmicPage>
    );
  }

  return (
    <CosmicPage>
      <Navigation />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-4xl font-playfair font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-white/10 backdrop-blur-md border-white/20 p-6">
                <div className="flex gap-4">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded border border-white/30"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
                    {item.category && (
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                    )}
                    <p className="text-lg font-bold text-primary">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 border border-white/30 rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center border-0 bg-transparent text-white"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 sticky top-24">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (18%)</span>
                  <span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span>₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigate("/checkout")}
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </CosmicPage>
  );
};

export default CartPage;
