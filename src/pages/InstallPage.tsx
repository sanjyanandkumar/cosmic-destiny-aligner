import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, CheckCircle2, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CosmicPage from "@/components/CosmicPage";
import { toast } from "@/hooks/use-toast";

export default function InstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Already Installed",
        description: "The app is already installed on your device or your browser doesn't support installation.",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast({
        title: "Success!",
        description: "BrahmaX has been installed on your device.",
      });
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  return (
    <CosmicPage>
      <Navigation />

      <section className="min-h-screen flex items-center justify-center py-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
              Install BrahmaX App
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the full BrahmaX experience with our installable web app. 
              Access your cosmic journey anytime, even offline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 text-white">
              <Smartphone className="w-12 h-12 mb-4 text-primary" />
              <h3 className="font-playfair text-2xl font-bold mb-4">Like a Native App</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Installs directly to your home screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Works on both iPhone and Android</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>No app store required</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 text-white">
              <Download className="w-12 h-12 mb-4 text-primary" />
              <h3 className="font-playfair text-2xl font-bold mb-4">Fast & Reliable</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Loads instantly like a native app</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Works offline after first visit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Automatic updates</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
            {isInstalled ? (
              <Card className="bg-primary/20 backdrop-blur-md border-primary/40 p-6 inline-block">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-white text-lg font-semibold">
                  App is already installed!
                </p>
                <p className="text-muted-foreground mt-2">
                  You can find it on your home screen
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                <Button 
                  onClick={handleInstall}
                  size="lg"
                  className="text-lg px-8 py-6"
                  disabled={!deferredPrompt}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Install BrahmaX App
                </Button>
                
                {!deferredPrompt && (
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 max-w-2xl mx-auto text-left">
                    <h4 className="font-semibold text-white mb-3">Manual Installation:</h4>
                    <div className="space-y-2 text-muted-foreground text-sm">
                      <p><strong className="text-white">On iPhone:</strong> Tap the Share button at the bottom, then scroll and tap "Add to Home Screen"</p>
                      <p><strong className="text-white">On Android:</strong> Tap the menu (⋮) in your browser, then tap "Install app" or "Add to Home screen"</p>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </CosmicPage>
  );
}
