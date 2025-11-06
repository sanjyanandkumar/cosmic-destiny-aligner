import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase.rpc("has_role", {
        _role: "admin",
        _user_id: user.id,
      });

      if (error || data !== true) {
        navigate("/login");
        return;
      }

      setAllowed(true);
    }

    verify();
  }, [navigate]);

  if (allowed === null) return <div>Loading…</div>;
  return <>{children}</>;
}