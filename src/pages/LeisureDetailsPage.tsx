import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import CosmicPage from "@/components/CosmicPage";
import { supabase } from "@/integrations/supabase/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

import baliTripImg from "@/assets/bali-trip.jpg";
import karmicMeditationImg from "@/assets/karmic-meditation.jpg";
import kumbakonamMainImg from "@/assets/kumbakonam-temple.jpg";
import kumbakonamSunImg from "@/assets/sun-temple.jpg";
import kumbakonamRahuImg from "@/assets/rahu-temple.jpg";
import kumbakonamGroupImg from "@/assets/group-meditation.jpg";
import bandipurImg from "@/assets/bandipur-forest.jpg";
import bandipurBisonImg from "@/assets/bandipur-bison.jpg";
import bandipurLeopardImg from "@/assets/bandipur-leopard.jpg";
import bandipurEagleImg from "@/assets/bandipur-eagle.jpg";
import sriLankaImg from "@/assets/sri-lanka-retreat.jpg";
import srilankaColomboImg from "@/assets/sri-lanka-colombo.jpg";
import srilankaKandyImg from "@/assets/sri-lanka-kandy.jpg";
import remediesMainImg from "@/assets/karmic-remedies.png";
import remediesImg1 from "@/assets/remedies-1.png";
import remediesImg2 from "@/assets/remedies-2.png";
import remediesImg3 from "@/assets/remedies-3.png";

const LeisureDetailsPage = () => {
  const { experienceId } = useParams();
  const {
    dialogOpen,
    currentProduct,
    processing,
    startCheckout,
    handleConfirmCheckout,
    handleCloseDialog,
  } = useCheckout();

  const experiences: Record<
    string,
    {
      name: string;
      price?: number;
      priceRange?: string;
      tagline?: string;
      startingPrice?: number,
      description: string;
      concept?: string;
      images: string[];
      highlights?: string[];
      schedule?: string[];
      pricingTiers?: { tier: string; price?: string; description: string }[];
      addOns?: { name: string; desc: string; price?: string }[];
    }
  > = {
    // 🌞 Temple Run
    "temple-run": {
      name: "Temple Run",
      priceRange: "₹16,999 – ₹25,999",
      tagline: "Travel through temples, align through planets.",
      description:
        "A planetary-aligned spiritual journey across the Navagraha temples of Kumbakonam — South India’s sacred axis of divine geometry.",
      concept:
        "A 2-night, 3-day planetary-aligned spiritual journey designed to realign planetary energies through guided visits, rituals, meditations, and astrology-infused sessions.",
      images: [
        kumbakonamMainImg,
        kumbakonamSunImg,
        kumbakonamRahuImg,
        kumbakonamGroupImg,
      ],
      highlights: [
        "BrahmaX Planet Passport booklet with stamps for each temple.",
        "BrahmaX Bhojana organic food prepared by local homemakers.",
        "Guided meditations themed for each planet.",
        "Personalized graha chart consultations with BrahmaX Founder - Abi.",
      ],
      schedule: [
        "🌅 Day 1 – Arrival, intro to planetary chart, visits to Sun and Moon temples.",
        "🌞 Day 2 – Visits to Mars, Mercury, Jupiter, Venus, and Saturn temples, with journaling and reflection.",
        "🌕 Day 3 – Rahu and Ketu temples + closing circle and certification.",
      ],
      pricingTiers: [
        {
          tier: "Tribe Tier",
          description: "Shared stay, food, transport, rituals.",
        },
        {
          tier: "Soul Tier",
          description: "Twin stay, astro consult, premium kit.",
        },
        {
          tier: "Founder’s Circle",
          description: "Private stay, 1:1 graha decoding, exclusive pooja.",
        },
      ],
    },

    // 🌿 Bandipur Retreat
    "bandipur-retreat": {
      name: "Bandipur Tour",
      priceRange: "₹9,999 – ₹17,999",
      tagline: "Return to your roots, realign your rhythm.",
      description:
        "Organic wellness retreat designed to align mind, body, and soul in the serene energy of Bandipur Forest, Karnataka.",
      concept:
        "A 1-night, 2-day organic wellness retreat designed to align mind, body, and soul in the serene energy of Bandipur Forest, Karnataka. Participants experience grounding meditations, sound healing, and soulful community bonding through nature and mindful experiences.",
      images: [bandipurImg, bandipurBisonImg, bandipurLeopardImg, bandipurEagleImg],
      highlights: [
        "The BrahmaX Bhojana Experience – meals cooked by local homemakers using organic ingredients.",
        "Mind–Body–Soul alignment sessions with yoga, journaling, and astrology insights.",
        "Guided wildlife safari symbolizing connection with natural and inner wilderness.",
        "Tribe Table Circle – shared dining fostering deep conversations and friendships.",
      ],
      schedule: [
        "🌅 Day 1 – Arrival, Tribe Circle, Sound Healing, Bonfire + BrahmaX Bhojana Dinner.",
        "🌞 Day 2 – Sunrise Yoga, Journaling, Safari, and Closing Manifestation Circle.",
      ],
      pricingTiers: [
        {
          tier: "Tribe Tier",
          description: "Shared stay, full retreat, safari, meals.",
        },
        {
          tier: "Soul Tier",
          description: "Twin stay, astro talk, premium kit.",
        },
        {
          tier: "Founder’s Circle",
          description: "Private stay, 1:1 karmic consult with Abi.",
        },
      ],
    },

    // 🌊 Karmic Island Experience – Sri Lanka
    "sri-lanka-retreat": {
      name: "Karmic Island Experience – Sri Lanka",
      priceRange: "₹47,999 – ₹64,999",
      tagline: "Lose your karma, not your calm. 🌊",
      startingPrice: 40000,
      description:
        `A karmic escape into the heart of Sri Lanka’s spiritual energy — lush forests, sacred temples, and coastal calm.`,
      concept:
        "A guided karmic escape into the heart of Sri Lanka’s spiritual energy — lush forests, sacred temples, and coastal calm. Designed by Abi (BrahmaX Leisure, Darkshadow Ventures LLP.) for seekers wishing to realign the Mind, Body, and Soul through astrology, nature, and soulful experiences.",
      images: [sriLankaImg, srilankaColomboImg, srilankaKandyImg],
      highlights: [
        "Round-trip from Bengaluru → Colombo (UL/Indigo/SriLankan Air).",
        "Guided astrology & sound healing sessions with Abi.",
        "Sacred temple visits in Kandy and meditation rituals.",
        "Eco-luxury accommodation and organic meals.",
      ],
      schedule: [
        "🌀 DAY 1 – The Mind Reset (Colombo → Kandy Hills)",
        "Arrival, Welcome Coconut & Sand Blessing, Astro Clarity Circle, Fire Ritual.",
        "🏡 Stay: Eco-hill villa in Kandy region.",
        "💪 DAY 2 – The Body Detox (Sigiriya / Ella Region)",
        "Sunrise Yoga, Karmic Trek, AstroTherapy, Sound Healing.",
        "💆‍♂️ Ayurvedic massage using planetary oils (Venus = rose, Mars = clove).",
        "🌕 DAY 3 – The Soul Integration (Temple of the Tooth, Kandy)",
        "Sacred Temple Visit, Soul Contract Letter, Rebirth of Light Meditation, Certificate Ceremony.",
      ],
      pricingTiers: [
        {
          tier: "🕉️ Economy (Karma Basic)",
          price: "₹47,999",
          description:
            "Shared twin villa, group sessions, economy flight, all meals.",
        },
        {
          tier: "🔱 Standard (Soul Alignment)",
          price: "₹54,999",
          description:
            "Private deluxe stay, personal consultation, ayurvedic massage, flight.",
        },
        {
          tier: "💎 Premium (Divine Resonance)",
          price: "₹64,999",
          description:
            "Boutique villa, private driver, extended session with Abi, aura photo, flight.",
        },
      ],
      addOns: [
        {
          name: "BrahmaX Wardrobe Kit",
          desc: "Custom tee + mala + copper bottle",
        },
        {
          name: "Personal Astro Report",
          desc: "Printed karmic blueprint",
        },
        {
          name: "Couple Karma Session",
          desc: "2-person guided reading",
        },
        {
          name: "Sri Lanka Aura Photography",
          desc: "Local collaboration",
        },
      ],
    },

    // 🔮 Karmic Personalized Remedies
    "karmic-remedies": {
      name: "Karmic Personalized Remedies",
      priceRange: "₹2,999 – ₹11,999",
      tagline: "Heal the cause, not the symptom.",
      description:
        "Karmic Personalized Remedies are individually prescribed astrological corrections designed to neutralize planetary imbalances at the karmic root. Based on your birth chart (Kundali), these remedies work at the energetic level — restoring harmony across mind, health, relationships, and career.",

      concept:
        "This is a deeply personalized karmic intervention, not a generic puja or ritual. After analyzing your planetary placements, doshas, retrogrades, and karmic debts, a precise set of remedies is prescribed — gemstones, mantras, rituals, donations, and behavioral corrections — aligned to your chart and life phase. The goal is not prediction, but energetic correction and accelerated alignment.",

      images: [
        remediesMainImg,
        remediesImg1,
        remediesImg2,
      ],

      highlights: [
        "1:1 Kundali analysis to identify karmic blocks and planetary imbalances.",
        "Personalized gemstone and metal recommendations (if applicable).",
        "Mantra prescriptions with exact counts, timings, and duration.",
        "Planetary rituals (pooja / homa / sankalpa) aligned to transit windows.",
        "Lifestyle and behavioral remedies to reinforce energetic correction.",
        "Clear explanation of WHY each remedy is prescribed (no blind faith).",
      ],

      schedule: [
        "🔍 Step 1 – Birth chart analysis and karmic block identification.",
        "🪐 Step 2 – Remedy design aligned to planets, houses, and dashas.",
        "🔥 Step 3 – Ritual execution guidance or assisted performance.",
        "📿 Step 4 – Mantra + lifestyle correction phase (21 / 48 / 90 days).",
        "✨ Step 5 – Integration and follow-up alignment check.",
      ],

      pricingTiers: [
        {
          tier: "Karmic Alignment & Planetary Correction",
          price: "₹2,999",
          description:
            "A kundali-based remedy program combining mantra and lifestyle guidance with either gemstone or ritual-based planetary corrections, delivered through a clear action plan.",
        },
        {
          tier: "Deep Karmic Reset",
          price: "₹11,999",
          description:
            "Full-spectrum remedy plan including rituals, mantras, donations, gemstones, and follow-up alignment review.",
        },
      ],

      addOns: [
        {
          name: "Gemstone Procurement",
          desc: "Energized gemstone sourced and prepared as per chart",
        },
        {
          name: "Assisted Ritual Performance",
          desc: "Ritual conducted on your behalf with sankalpa",
        },
        {
          name: "Follow-up Alignment Review",
          desc: "30-day or 90-day remedy effectiveness check",
        },
      ],
    },
    // 🧘‍♂️ Customized Karmic Meditation
    "karmic-meditation": {
      name: "Customized Karmic Meditation",
      price: 2000,
      tagline: "Meditation designed for your karma, not the crowd.",
      description:
        "Customized Karmic Meditation is a deeply personalized meditation experience designed using your birth chart (Kundali). Unlike generic guided meditations, this session works directly with your planetary placements, mental patterns, and karmic imprints to restore balance, clarity, and emotional stability.",

      concept:
        "Every individual carries a unique karmic rhythm shaped by planetary positions at birth. This meditation is crafted specifically for you — identifying which planet needs calming, strengthening, or balancing. Through breathwork, mantra, visualization, and silence, the session helps dissolve mental noise, emotional blocks, and subconscious resistance, allowing your natural alignment to emerge effortlessly.",

      images: [
        karmicMeditationImg
      ],

      highlights: [
        "Personalized meditation design based on your birth chart.",
        "Planet-specific calming or strengthening techniques.",
        "Guided breathwork aligned to your dominant graha.",
        "Mantra or sound frequency tailored to your karmic need.",
        "Recorded session you can revisit post-consultation.",
        "Suitable for beginners and advanced practitioners alike.",
      ],

      schedule: [
        "🔍 Step 1 – Birth details analysis to identify mental and emotional patterns.",
        "🪐 Step 2 – Planetary focus selection (Moon, Mercury, Saturn, etc.).",
        "🧘 Step 3 – Live guided meditation session (online or in-person).",
        "🎧 Step 4 – Delivery of personalized meditation recording.",
        "✨ Step 5 – Guidance on daily or weekly integration practice.",
      ],

      pricingTiers: [
        {
          tier: "Single Session",
          price: "₹2,000",
          description:
            "One personalized guided meditation session with recording.",
        },
        {
          tier: "Alignment Pack",
          price: "₹4,999",
          description:
            "Three-session package for sustained mental and emotional alignment.",
        },
      ],

      addOns: [
        {
          name: "Mantra Prescription",
          desc: "Personal mantra with exact count and timing guidance",
        },
        {
          name: "Sleep Alignment Meditation",
          desc: "Customized night meditation for deep rest and emotional reset",
        },
      ],
    }
  };

  const experience = experienceId ? experiences[experienceId] : null;
  if (!experience) return <Navigate to="/leisure" replace />;

  return (
    <CosmicPage>
      <Navigation />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            {/* Images */}
            <div>
              <Carousel className="w-full">
                <CarouselContent>
                  {experience.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <div className="relative h-[480px] overflow-hidden rounded-lg">
                        <img
                          src={img}
                          alt={`${experience.name} - ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {experience.name}
              </h1>
              <div className="mb-6">
                <p className="text-xl italic text-muted-foreground mb-1">
                  {experience.tagline}
                </p>

                {experience.startingPrice && (
                  <p className="text-white font-semibold text-lg">
                    Starting from ₹{experience.startingPrice.toLocaleString()} per person
                  </p>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed text-justify mb-4 whitespace-pre-line">
                {experience.description}
              </p>

              {/* Concept */}
              {experience.concept && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">🌿 Concept Overview</h2>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    {experience.concept}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {experience.highlights && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">🔱 Highlights</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    {experience.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Schedule */}
              {experience.schedule && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-3">📅 Schedule</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    {experience.schedule.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing */}
              {experience.pricingTiers && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-3">💰 Tier Structure</h2>
                  <div className="space-y-4">
                    {experience.pricingTiers.map((tier, i) => (
                      <div
                        key={i}
                        className="border border-white/20 bg-white/10 rounded-lg p-4"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-primary">{tier.tier}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">{tier.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {experience.addOns && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-3">✨ Optional Add-ons</h2>
                  <ul className="space-y-2 text-muted-foreground text-justify">
                    {experience.addOns.map((a, i) => (
                      <li key={i} className="flex justify-between border-b border-white/10 pb-1">
                        <span>{a.name} — {a.desc}</span>
                        <span className="text-primary font-semibold">{a.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                onClick={async () => {
                  const { data } = await supabase.auth.getUser();
                  if (!data?.user) {
                    window.location.href = `/login?redirect=/leisure/${experienceId}`;
                    return;
                  }
                  startCheckout({
                    name: experience.name,
                    price: experience.price || 50000,
                    description: experience.description,
                  });
                }}
                disabled={processing}
                className="
                  w-[170px]
                  inline-block font-bold
                  px-8 py-2
                  rounded-lg
                  bg-gradient-to-r from-[#FF8C00] via-[#FFB347] to-[#FFD280]
                  text-black shadow-lg
                  hover:shadow-[0_0_30px_rgba(255,200,100,0.8)]
                  transition-all
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {processing ? "Processing..." : "Reserve NOW"}
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/leisure"
            className="text-white underline text-lg hover:text-primary transition-all"
          >
            ← Back to Leisure
          </Link>
        </div>

      </section>

      <Footer />

      <CheckoutDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        productName={currentProduct?.name || ""}
        price={currentProduct?.price || 0}
        onConfirm={handleConfirmCheckout}
        processing={processing}
      />
    </CosmicPage>
  );
};

export default LeisureDetailsPage;
