import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import CosmicPage from "@/components/CosmicPage";
import { useEffect } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Tech Entrepreneur",
    content:
      "The consulting division helped me make strategic decisions at the right cosmic timing. My business growth has been phenomenal since working with BrahmaX",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Fashion Designer",
    content:
      "BrahmaX transformed how I understand my personal style. The karmic blueprint was very accurate and helped me align my wardrobe with my true self",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Student",
    content:
      "BrahmaX's Gurukul approach to education through karmic guidance is revolutionary. I finally found clarity in my career path and academic choices",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    role: "Travel Enthusiast",
    content:
      "The wellness division curated a journey that was spiritually transformative. Every destination aligned perfectly with my astrological chart",
    rating: 5,
  },
];

const TrustProof = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // ⭐ Auto-play logic
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, [paused]);
  
  return (
    <CosmicPage>
      <section id="trust" className="py-14 md:py-6">
        <div className="container mx-auto px-4">

          <div className="text-center mb-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4
              bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
              text-transparent bg-clip-text">
              Trusted by many
              <span
                className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                text-transparent bg-clip-text"
              >
                ...
              </span>
              </h2>
            <p className="font-inter text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands who have unlocked their karmic potential with BrahmaX
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-0">
                <Card
                  className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                <CardContent className="pt-4 pb-8 md:pt-6 md:pb-6 px-8">

                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="icon" onClick={prevTestimonial} className="text-white hover:bg-white/10">
                      <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <div className="flex-1 text-center px-8">
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>

                    <p className="font-inter text-lg md:text-xl text-white/90 italic mb-6">
                      "{testimonials[currentIndex].content}"
                    </p>

                    <p className="font-playfair text-xl font-semibold text-white">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>

                  <Button variant="ghost" size="icon" onClick={nextTestimonial} className="text-white hover:bg-white/10">
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Carousel dots */}
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentIndex === i ? "bg-primary w-6" : "bg-primary/40 hover:bg-primary/70"
                      }`}
                    />
                  ))}
                </div>
                {/* Subtitle Below Carousel */}
                <p className="mt-8 text-center text-3xl font-inter text-white">
                  Like them - transform your life too
                  <span
                    className="bg-gradient-to-r from-[#FFB347] via-[#FFD280] to-[#FF8C00]
                    text-transparent bg-clip-text"
                  >
                    !
                  </span>
                </p>

              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </CosmicPage>
  );
};

export default TrustProof;
