import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import CosmicPage from "@/components/CosmicPage";
import blueprintImg from "@/assets/report.png";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import reportImg from "@/assets/sample-report.png";

const reports = [
  {
    title: "Karmic Blueprint Report",
    summary:
      "A comprehensive analysis of an individual's karmic patterns, life themes, strengths, and challenges, mapped across planetary influences.",
    file: "/reports/karmic-blueprint-sample.pdf",
    image: reportImg,
  },
  {
    title: "Career & Purpose Alignment Report",
    summary:
      "Provides clarity on career direction, natural talents, growth phases, and decision timing aligned with karmic indicators.",
    file: "/reports/career-alignment-sample.pdf",
    image: reportImg,
  },
  {
    title: "Relationship Harmony Report",
    summary:
      "Explores compatibility patterns, emotional dynamics, and karmic lessons influencing personal and professional relationships.",
    file: "/reports/relationship-harmony-sample.pdf",
    image: reportImg,
  },
  {
    title: "Wellness & Energy Balance Report",
    summary:
      "Focuses on mental, emotional, and energetic well-being, highlighting imbalances and personalized practices for alignment.",
    file: "/reports/wellness-energy-sample.pdf",
    image: reportImg,
  },
];

const SampleReportsPage = () => {
  return (
    <>
    <Navigation />
    <CosmicPage>
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 mt-8">
              Sample Karmic Reports
            </h1>
            <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Experience the depth, clarity, and precision of BrahmaX reports. Each sample demonstrates how insights are translated into actionable guidance.
            </p>

            {/* IMAGE BELOW TEXT */}
            <div className="flex justify-center">
                <img
                src={blueprintImg}
                alt="Karmic Blueprint Visualization"
                className="
                    w-full max-w-xl
                    rounded-2xl
                    border border-white/20
                    shadow-[0_0_40px_rgba(255,200,120,0.25)]
                    backdrop-blur-md
                "
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {reports.map((report, index) => (
              <Card
                key={index}
                className="border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl
                           hover:shadow-[0_0_25px_rgba(255,220,120,0.35)]
                           hover:border-primary/60 transition-all duration-500"
              >
                <CardContent className="p-6 flex gap-6 h-full">
                  {/* LEFT: Report Image */}
                  <div className="w-[140px] flex-shrink-0">
                    <img
                      src={report.image}
                      alt={report.title}
                      className="
                        w-full h-[180px] object-contain
                        rounded-lg
                        border border-white/20
                        bg-black/30
                        shadow-[0_0_20px_rgba(255,200,120,0.25)]
                      "
                    />
                  </div>

                  {/* RIGHT: Text + CTA */}
                  <div className="flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="font-playfair text-2xl font-semibold text-white mb-2">
                        {report.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {report.summary}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <a href={report.file} download>
                        <Button
                          variant="outline"
                          className="border-primary/50 text-primary hover:bg-primary/20 hover:text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Sample
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </CosmicPage>
    <Footer />
    </>
  );
};

export default SampleReportsPage;
