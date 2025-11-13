import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Extract tokens from hash or query string
const extractTokens = () => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const queryParams = new URLSearchParams(window.location.search);

  return {
    access_token: (hashParams.get("access_token") || queryParams.get("access_token") || "").trim(),
    refresh_token: (hashParams.get("refresh_token") || queryParams.get("refresh_token") || "").trim(),
  };
};

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { access_token, refresh_token } = extractTokens();

    if (!access_token || !refresh_token) {
      toast({
        title: "Link Error",
        description: "Missing tokens. Please use the password reset link from your email.",
        variant: "destructive",
      });
      return;
    }

    const restoreSession = async () => {
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        toast({
          title: "Session Error",
          description: error.message || "Unable to restore session.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      setReady(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    };

    restoreSession();
  }, [navigate]);

  const handleReset = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your password has been updated. Please log in.",
    });
    navigate("/login");
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Verifying reset link...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 border rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        <Input
          type="password"
          placeholder="Enter new password (min 6 characters)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleReset} className="w-full">
          Update Password
        </Button>
      </div>
    </div>
  );
}