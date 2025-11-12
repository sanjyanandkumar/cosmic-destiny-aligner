import { useEffect, useRef, useState } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // ✅ Core fade helpers
  const fadeIn = (audio: HTMLAudioElement) => {
    let vol = 0;
    audio.volume = vol;
    const fade = setInterval(() => {
      if (vol < 0.4) {
        vol += 0.05;
        audio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 200);
  };

  const fadeOut = (audio: HTMLAudioElement, onDone: () => void) => {
    let vol = audio.volume;
    const fade = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.05;
        audio.volume = vol;
      } else {
        clearInterval(fade);
        audio.pause();
        onDone();
      }
    }, 150);
  };

  // ✅ Works reliably across Chrome / Safari / Edge
  useEffect(() => {
    const startMusic = () => {
      if (!audioRef.current || started) return;

      const audio = audioRef.current;
      audio.loop = true;
      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            fadeIn(audio);
            setIsPlaying(true);
            setStarted(true);
          })
          .catch((err) => {
            console.warn("Autoplay blocked:", err);
          });
      }

      // Remove all triggers after the first start
      ["click", "scroll", "mousemove", "touchstart"].forEach((event) =>
        window.removeEventListener(event, startMusic)
      );
    };

    // 🎧 User gesture listeners
    ["click", "scroll", "mousemove", "touchstart"].forEach((event) =>
      window.addEventListener(event, startMusic, { once: true })
    );

    return () => {
      ["click", "scroll", "mousemove", "touchstart"].forEach((event) =>
        window.removeEventListener(event, startMusic)
      );
    };
  }, [started]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      fadeOut(audioRef.current, () => setIsPlaying(false));
    } else {
      audioRef.current
        .play()
        .then(() => {
          fadeIn(audioRef.current!);
          setIsPlaying(true);
          setStarted(true);
        })
        .catch((err) => console.log("Playback blocked:", err));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/cosmic-bg.mp3" preload="auto" />
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={togglePlay}
          className={`px-4 py-2 rounded-full backdrop-blur-md border transition 
            ${isPlaying ? "bg-primary/20 text-primary hover:bg-primary/30" : "bg-black/40 text-white hover:bg-white/20"}
          `}
        >
          {isPlaying ? "⏸ Pause Music" : "🎵 Play Music"}
        </button>
      </div>
    </>
  );
};

export default BackgroundMusic;
