import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import bg from "@/assets/cosmic-background.png";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email: string) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast({ title: "Missing Fields", description: "Please enter both email and password", variant: "destructive" });
      return;
    }

    if (!isValidEmail(email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
	console.log("The error is:" + error + ", email:" + email + ", password:" + password);
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Logged in successfully!" });

      // ✅ IMPORTANT: Use redirect param if exists
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get("redirect") || "/admin"; // default is /admin
    navigate(redirectTo);
    }
  };

return (
  <div className="min-h-screen flex flex-col">
    <Navigation />

    <main
      className="flex-1 flex justify-center bg-cover bg-center relative py-32"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 p-6 border border-white/20 rounded-lg shadow-lg w-full max-w-sm bg-black/70 backdrop-blur-md text-white mt-24">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (!value) setEmailError("Email is required");
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) setEmailError("Enter a valid email address");
            else setEmailError("");
          }}
          className={`mb-1 ${emailError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {emailError && <p className="text-red-500 text-xs mb-2">{emailError}</p>}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 text-white placeholder-white/60 bg-white/10 border-white/20"
        />

        <Button
          onClick={handleLogin}
          className="w-full"
          disabled={!!emailError || !email || !password}
        >
          Login
        </Button>

		<Button
		  variant="link"
		  className="mt-2 text-sm text-primary"
		  onClick={async () => {
			const { error } = await supabase.auth.resetPasswordForEmail(email);
			if (error) {
			  toast({ title: "Reset Failed", description: error.message, variant: "destructive" });
			} else {
			  toast({ title: "Reset Email Sent", description: "Check your inbox to set a new password." });
			}
		  }}
		>
		  Forgot Password?
		</Button>
        <p className="text-center text-sm mt-4 text-white/80">
          New user?{" "}
          <a href="/register" className="text-primary hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </main>

    <Footer />
  </div>
);
}
