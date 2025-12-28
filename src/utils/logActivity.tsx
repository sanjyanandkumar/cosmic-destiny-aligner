import { supabase } from "@/integrations/supabase/client";

export const logActivity = async ({
  activityType,
  vertical,
  entityType,
  entityId,
  metadata = {},
}: {
  activityType: string;
  vertical?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, any>;
}) => {
  const { data } = await supabase.auth.getUser();
  if (!data?.user) return;

  await supabase.from("user_activity").insert({
    user_id: data.user.id,
    activity_type: activityType,
    vertical,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
    user_agent: navigator.userAgent,
  });
};
