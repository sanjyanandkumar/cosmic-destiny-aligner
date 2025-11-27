import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Menu, X, Sparkles, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import brahmaXLogo from "@/assets/brahmax-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Philosophy", href: "/philosophy" },
    { name: "Leadership", href: "/leadership" },
    { name: "Awards", href: "/awards" },
    { name: "Orders", href: "/orders" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-indigo/95 backdrop-blur-sm border-b border-cosmic-blue/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-30">

          <Link to="/" className="flex items-center gap-2 leading-tight group">

            {/* Smaller logo */}
            <img
              src={brahmaXLogo}
              alt="BrahmaX Logo"
              className="h-14 w-auto animate-pulse-glow" 
            />

          </Link>

          <div className="hidden md:flex items-center space-x-8">

            {/* GROUPED ORIGIN MENU */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-inter text-foreground hover:text-primary transition cursor-pointer">
                Origin <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card/80 backdrop-blur border-cosmic-blue/30 text-base md:text-lg font-inter font-medium">
                <DropdownMenuItem asChild>
                  <Link to="/philosophy">Philosophy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/leadership">Leadership</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/verticaldet" className="text-sm font-inter text-foreground hover:text-primary transition">Verticals</Link>
            <Link to="/orders" className="text-sm font-inter text-foreground hover:text-primary transition">Orders</Link>
            
            <Button variant="ghost" size="icon" onClick={() => navigate("/cart")} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer select-none hover:text-primary transition">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {(user.user_metadata?.full_name
                      ? user.user_metadata.full_name.charAt(0)
                      : user.email?.charAt(0)
                    )?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user.user_metadata?.full_name?.split(" ")[0] || user.email}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40 bg-card/90 backdrop-blur border-cosmic-blue/30">
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="text-base md:text-lg font-inter font-medium px-4 py-2" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-cosmic-blue/30">

            {/* Grouped Origin */}
            <details className="group">
              <summary className="cursor-pointer text-foreground hover:text-primary transition">
                Origin
              </summary>
              <div className="mt-2 ml-4 space-y-2">
                <Link to="/philosophy" className="block text-base font-medium text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Philosophy</Link>
                <Link to="/leadership" className="block text-base font-medium text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Leadership</Link>
                <Link to="/awards" className="block text-base font-medium text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Awards</Link>
              </div>
            </details>

            <Link to="/about" className="block" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/verticaldet" className="block" onClick={() => setIsOpen(false)}>Verticals</Link>
            <Link to="/orders" className="block" onClick={() => setIsOpen(false)}>Orders</Link>
            <Link to="/contact" className="block" onClick={() => setIsOpen(false)}>Contact</Link>

            {user ? (
              <>
                <div className="pt-2 border-t border-cosmic-blue/30 text-sm">{user.email}</div>
                <button onClick={handleLogout} className="text-destructive text-sm">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block text-sm font-inter" onClick={() => setIsOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
