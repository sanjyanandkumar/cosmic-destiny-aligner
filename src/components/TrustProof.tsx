import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import CosmicPage from "@/components/CosmicPage";
import bg from "@/assets/cosmic-background.png";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Designer",
    content:
      "BrahmaX transformed how I understand my personal style. The karmic blueprint was eerily accurate and helped me align my wardrobe with my true self.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Tech Entrepreneur",
    content:
      "The consulting division helped me make strategic decisions at the right cosmic timing. My business growth has been phenomenal since working with BrahmaX.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Student",
    content:
      "EduSeam's approach to education through karmic guidance is revolutionary. I finally found clarity in my career path and academic choices.",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    role: "Travel Enthusiast",
    content:
      "The leisure division curated a journey that was spiritually transformative. Every destination aligned perfectly with my astrological chart.",
    rating: 5,
  },
];

const TrustProof = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <CosmicPage bgSrc={bg} showNav={false} showFooter={false}>
      <section id="trust" className="py-28 md:py-32">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Cosmic Seekers
              </span>
            </h2>
            <p className="font-inter text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Join thousands who have unlocked their karmic potential with BrahmaX
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl">
              <CardContent className="p-8 md:p-12">

                <div className="flex items-center justify-between mb-8">
                  <Button variant="ghost" size="icon" onClick={prevTestimonial} className="text-white hover:bg-white/10">
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <div className="flex-1 text-center px-8">
                    {/* Rating stars */}
                    <div className="flex justify-center gap-1 mb-6">
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
                    <p className="font-inter text-sm text-white/60">
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

              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </CosmicPage>
  );
};

export default TrustProof;
