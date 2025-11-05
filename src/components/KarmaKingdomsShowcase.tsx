import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import baliTripImg from "@/assets/bali-trip.jpg";
import careerGuidanceImg from "@/assets/career-guidance.jpg";
import cosmicHandbagImg from "@/assets/cosmic-handbag.jpg";
import cosmicWalletImg from "@/assets/cosmic-wallet.jpg";
import karmicConsultingImg from "@/assets/karmic-consulting.jpg";
import karmicMeditationImg from "@/assets/karmic-meditation.jpg";

const KarmaKingdomsShowcase = () => {
  const items = [
    {
      title: "Cosmic Wallet",
      image: cosmicWalletImg,
      link: "/wardrobe/cosmic-wallet",
    },
    {
      title: "Celestial Handbag",
      image: cosmicHandbagImg,
      link: "/wardrobe/celestial-handbag",
    },
    {
      title: "Bali Spiritual Journey",
      image: baliTripImg,
      link: "/leisure",
    },
    {
      title: "Career Guidance",
      image: careerGuidanceImg,
      link: "/consulting",
    },
    {
      title: "Karmic Consulting",
      image: karmicConsultingImg,
      link: "/consulting",
    },
    {
      title: "Karmic Meditation",
      image: karmicMeditationImg,
      link: "/consulting",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Where Karma Builds Kingdoms
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our cosmic offerings
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
            {items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Link to={item.link}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className="relative h-[300px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <h3 className="text-white text-2xl font-bold">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default KarmaKingdomsShowcase;
