import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
	const [showResend, setShowResend] = useState(false);

	const handleRegister = async () => {
	  if (!email || !password || !name) {
		toast({ title: "Missing fields", description: "Fill all fields", variant: "destructive" });
		return;
	  }

	  const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
		  data: { full_name: name },
		},
	  });

	  // ✅ Case: user already exists but not confirmed yet
	  if (error?.code === "user_already_exists") {
		toast({
		  title: "Email Already Registered",
		  description: "Please confirm your email, or resend verification link below.",
		});
		setShowResend(true);
		return;
	  }

	  // ✅ Any other signup error
	  if (error) {
		toast({ title: "Registration Failed", description: error.message, variant: "destructive" });
		return;
	  }

	  // ✅ Success & email confirmation required
	  toast({
		title: "Verification Email Sent",
		description: "Check your inbox and confirm your email to activate your account.",
	  });

	  // ✅ Show resend link because confirmation pending
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
		title: "Verification Email Resent",
		description: "Please check your inbox again.",
	  });
	};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 border rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

        <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-3" />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-3" />

        <Button onClick={handleRegister} className="w-full">Create Account</Button>

		{showResend && (
		  <div className="mt-4 text-center">
			<p className="text-sm text-muted-foreground mb-2">
			  Didn't receive the email or link expired?
			</p>
			<Button variant="outline" size="sm" onClick={handleResendEmail}>
			  Resend Verification Email
			</Button>
		  </div>
		)}

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}