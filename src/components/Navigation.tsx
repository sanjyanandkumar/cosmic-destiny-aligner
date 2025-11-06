import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

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

	  // Listen for login/logout without refresh
	  const { data: authListener } = supabase.auth.onAuthStateChange(() => {
		getUser();
	  });

	  return () => authListener.subscription.unsubscribe();
	}, []);

	const handleLogout = async () => {
	  await supabase.auth.signOut();
	  setUser(null);
	  navigate("/"); // redirect to homepage (or /login)
	};

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-indigo/95 backdrop-blur-sm border-b border-cosmic-blue/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              BrahmaX
            </span>
          </Link>

          {/* Desktop Navigation */}
		<div className="hidden md:flex items-center space-x-8">
		  {navLinks.map((link) => (
			<Link
			  key={link.name}
			  to={link.href}
			  className="text-foreground hover:text-primary transition-colors text-sm font-medium"
			>
			  {link.name}
			</Link>
		  ))}

		  {user ? (
			<div className="flex items-center space-x-4">
			<span className="text-sm text-muted-foreground">
			  {user.user_metadata?.full_name || user.email}
			</span>
			  <Button variant="outline" size="sm" onClick={handleLogout}>
				Logout
			  </Button>
			</div>
		  ) : (
			<div className="flex items-center space-x-4">
			  <Button variant="outline" size="sm" asChild>
				<Link to="/login">Login</Link>
			  </Button>
			</div>
		  )}
		</div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
		{isOpen && (
		  <div className="md:hidden py-4 space-y-4 border-t border-cosmic-blue/30">
			{navLinks.map((link) => (
			  <Link
				key={link.name}
				to={link.href}
				className="block text-foreground hover:text-primary transition-colors"
				onClick={() => setIsOpen(false)}
			  >
				{link.name}
			  </Link>
			))}
		  </div>
		)}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-cosmic-blue/30">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
