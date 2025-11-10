import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  const { email, name, downloadLink, orderNumber } = await req.json();
  const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

  await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  await supabase.functions.invoke("send-email", {
    body: {
      to: email,
      subject: `Your BrahmaX Report #${orderNumber}`,
      html: `
        <p>Hi ${name},</p>
        <p>Your karmic report is now ready.</p>
        <p><a href="${downloadLink}">Click here to download</a></p>
        <p>With cosmic alignment,<br>BrahmaX Team</p>
      `,
    },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
