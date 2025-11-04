import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Designer",
    content: "BrahmaX transformed how I understand my personal style. The karmic blueprint was eerily accurate and helped me align my wardrobe with my true self.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Tech Entrepreneur",
    content: "The consulting division helped me make strategic decisions at the right cosmic timing. My business growth has been phenomenal since working with BrahmaX.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Student",
    content: "EduSeam's approach to education through karmic guidance is revolutionary. I finally found clarity in my career path and academic choices.",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    role: "Travel Enthusiast",
    content: "The leisure division curated a journey that was spiritually transformative. Every destination aligned perfectly with my astrological chart.",
    rating: 5,
  },
];

const brands = [
  "Forbes",
  "Vogue India",
  "Economic Times",
  "GQ",
  "Elle",
  "Business Today",
];

const TrustProof = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-14 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by{" "}
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Cosmic Seekers
            </span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who have unlocked their karmic potential with BrahmaX
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card/50 backdrop-blur border-primary/20 shadow-cosmic">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTestimonial}
                  className="text-primary hover:bg-primary/10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <div className="flex-1 text-center px-8">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="font-inter text-lg md:text-xl text-foreground mb-6 italic">
                    "{testimonials[currentIndex].content}"
                  </p>

                  {/* Author */}
                  <div>
                    <p className="font-playfair text-xl font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTestimonial}
                  className="text-primary hover:bg-primary/10"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Brand Mentions removed as requested */}
      </div>
    </section>
  );
};

export default TrustProof;
