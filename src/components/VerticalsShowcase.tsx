import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import consultingImg from "@/assets/karmic-consulting.jpg";
import wardrobeImg from "@/assets/cosmic-wallet.jpg";
import eduseamImg from "@/assets/career-guidance.jpg";
import leisureImg from "@/assets/bali-trip.jpg";
import bg from "@/assets/cosmic-background.png";

const verticals = [
  {
    title: "BrahmaX Consulting",
    subtitle: "The Karmic Business Division",
    image: consultingImg,
    link: "/consulting",
    description: "Strategic cosmic guidance for your business ventures",
  },
  {
    title: "BrahmaX Wardrobe",
    subtitle: "The Astro-Fashion Division",
    image: wardrobeImg,
    link: "/wardrobe",
    description: "Celestially aligned fashion and accessories",
  },
  {
    title: "EduSeam",
    subtitle: "The Passport to Conscious Learning",
    image: eduseamImg,
    link: "/eduseam",
    description: "Transform your educational journey with cosmic wisdom",
  },
  {
    title: "BrahmaX Leisure",
    subtitle: "The Karmic Wellness Division",
    image: leisureImg,
    link: "/leisure",
    description: "Rejuvenate your spirit through cosmic travel experiences",
  },
];

const VerticalsShowcase = () => {
  return (
	<section
	  id="showcase"
	  className="relative py-24 bg-cover bg-center bg-no-repeat"
	  style={{ backgroundImage: `url(${bg})` }}
	>
	  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
	  <div className="relative z-10">
	<div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scroll through our cosmic offerings and book your transformation
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {verticals.map((vertical, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="group overflow-hidden bg-card border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={vertical.image}
                      alt={vertical.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black/90 via-cosmic-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {vertical.title}
                      </h3>
                      <p className="text-sm text-primary/80 mb-2">
                        {vertical.subtitle}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {vertical.description}
                      </p>
                      <Link to={vertical.link}>
                        <Button
                          size="sm"
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
      </div>
    </section>
  );
};

export default VerticalsShowcase;
