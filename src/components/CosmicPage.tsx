import bg from "@/assets/cosmic-background.png";
import GalaxyBackground from "@/components/GalaxyBackground";

export default function CosmicPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[4px]" />
      <GalaxyBackground className="absolute inset-0 opacity-60 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
