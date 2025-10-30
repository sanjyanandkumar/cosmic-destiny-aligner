import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

if (!KEY_ID || !KEY_SECRET) {
  console.error("Razorpay keys are not configured in environment variables.");
}

async function hmacSHA256Hex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const bytes = new Uint8Array(signature);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, amount, currency, receipt, notes, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (action === "create-order") {
      if (!KEY_ID || !KEY_SECRET) {
        return new Response(JSON.stringify({ error: "Razorpay not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!amount || !currency) {
        return new Response(JSON.stringify({ error: "Missing amount or currency" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const auth = "Basic " + btoa(`${KEY_ID}:${KEY_SECRET}`);

      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency, receipt, notes }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Razorpay order error:", data);
        return new Response(JSON.stringify({ error: data || "Failed to create order" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ order: data, key: KEY_ID }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return new Response(JSON.stringify({ error: "Missing verification fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!KEY_SECRET) {
        return new Response(JSON.stringify({ error: "Razorpay not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expected = await hmacSHA256Hex(payload, KEY_SECRET);
      const ok = expected === razorpay_signature;

      return new Response(JSON.stringify({ ok }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unsupported action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("razorpay-payment function error:", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});