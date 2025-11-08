import { supabase } from "@/integrations/supabase/client";

export const requireLogin = async (redirectTo?: string) => {
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    // Default redirect to homepage if none passed
    const target = redirectTo || window.location.pathname;
    window.location.href = `/login?redirect=${encodeURIComponent(target)}`;
    return null; // Means user not logged in
  }

  return data.user; // Means user IS logged in
};