import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import bg from "@/assets/cosmic-background.png";
import CosmicPage from "@/components/CosmicPage";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();
  const [accountCreated, setAccountCreated] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      toast({
        title: "Missing fields",
        description: "Fill all fields",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error?.code === "user_already_exists") {
      toast({
        title: "Email Already Registered",
        description: "Please verify your email or resend verification.",
      });
      setShowResend(true);
      return;
    }

    if (error) {
      console.error("Supabase signup error:", error);
      toast({ title: "Registration Failed", description: error.message, variant: "destructive" });
      return;
    }

    if (data?.user) {
      await supabase.from("user_roles").insert({
        user_id: data.user.id,
        role: "user",
      });
    }
    toast({
      title: "Verification Email Sent",
      description: "Check your inbox and confirm your email.",
    });

    setAccountCreated(true);
    setShowResend(true);
  };

  const handleResendEmail = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      toast({ title: "Could not resend email", description: error.message, variant: "destructive" });
      return;
    }

    toast({
      title: "Verification Email Sent Again",
      description: "Check your inbox.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-inter">
    <CosmicPage>
      <Navigation />

      <main
        className="flex-1 flex justify-center items-center bg-cover bg-center relative py-32"
      >

        <div className="relative z-10 p-6 border border-white/20 rounded-lg shadow-lg w-full max-w-sm bg-black/70 backdrop-blur-md text-white">
          <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

          <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-3 bg-black/40 text-white placeholder:text-white/50
    border-white/20 focus:border-primary focus:ring-primary/40" />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 bg-black/40 text-white placeholder:text-white/50
    border-white/20 focus:border-primary focus:ring-primary/40" />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className=" mb-3 bg-black/40 text-white placeholder:text-white/50
    border-white/20 focus:border-primary focus:ring-primary/40" />

          <Button
            onClick={handleRegister}
            className="w-full"
            disabled={accountCreated}
          >
            Create Account
          </Button>

          {accountCreated && (
            <div className="mt-4 text-center">
              <p className="text-sm text-green-400 font-semibold mb-2">
                ✅ Account created successfully
              </p>

              <p className="text-sm text-white/80 mb-2">
                Didn't receive the verification email?
              </p>

              <Button
                variant="outline"
                size="sm"
                onClick={handleResendEmail}
                className="border-primary text-primary hover:bg-primary hover:text-black"
              >
                Resend Verification Email
              </Button>
            </div>
          )}

          <p className="text-center text-sm mt-4 text-white/80">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
      </CosmicPage>
    </div>
  );
}