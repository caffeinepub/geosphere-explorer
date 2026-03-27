import { Compass, Globe2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80",
    label: "Taj Mahal, India",
  },
  {
    url: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=1920&q=80",
    label: "Eiffel Tower, France",
  },
  {
    url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&q=80",
    label: "Machu Picchu, Peru",
  },
  {
    url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80",
    label: "Colosseum, Rome",
  },
  {
    url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80",
    label: "Great Wall, China",
  },
  {
    url: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1920&q=80",
    label: "Pyramids of Giza, Egypt",
  },
  {
    url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1920&q=80",
    label: "Angkor Wat, Cambodia",
  },
  {
    url: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=1920&q=80",
    label: "Petra, Jordan",
  },
];

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      data-ocid="landing.page"
    >
      {/* Slideshow */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.url}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms]"
          style={{
            backgroundImage: `url(${slide.url})`,
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,13,24,0.55) 0%, rgba(11,18,32,0.65) 50%, rgba(6,13,24,0.88) 100%)",
        }}
      />

      {/* Slide label bottom-right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-20 right-6 z-20 text-right"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(244,178,60,0.75)" }}
          >
            {SLIDES[current].label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
          style={{
            filter: "drop-shadow(0 0 24px rgba(244,178,60,0.55))",
          }}
        >
          <img
            src="/assets/generated/geosphere-logo-transparent.dim_200x200.png"
            alt="GeoSphere Logo"
            width={120}
            height={120}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const fallback = document.getElementById("logo-fallback");
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div
            id="logo-fallback"
            style={{ display: "none" }}
            className="items-center justify-center w-28 h-28 rounded-full"
          >
            <Globe2 size={80} style={{ color: "#F4B23C" }} />
          </div>
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-center leading-none"
            style={{
              color: "#EAF0F8",
              textShadow:
                "0 2px 32px rgba(0,0,0,0.8), 0 0 80px rgba(244,178,60,0.15)",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            GeoSphere
          </h1>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.12em] text-center"
            style={{
              color: "#F4B23C",
              textShadow: "0 2px 24px rgba(0,0,0,0.7)",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Explorer
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="text-sm sm:text-base tracking-[0.2em] uppercase text-center"
          style={{ color: "rgba(169,182,201,0.9)", maxWidth: "380px" }}
        >
          Discover the World&apos;s Wonders
        </motion.p>

        {/* Start Exploring button */}
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          data-ocid="landing.primary_button"
          className="relative mt-2 flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 overflow-hidden cursor-pointer"
          style={{
            background: hovered
              ? "linear-gradient(135deg, #F4B23C 0%, #e8960a 100%)"
              : "linear-gradient(135deg, rgba(244,178,60,0.15) 0%, rgba(244,178,60,0.08) 100%)",
            border: "1.5px solid rgba(244,178,60,0.7)",
            color: hovered ? "#0B1220" : "#F4B23C",
            boxShadow: hovered
              ? "0 0 40px rgba(244,178,60,0.45), 0 4px 24px rgba(0,0,0,0.4)"
              : "0 0 20px rgba(244,178,60,0.15), 0 4px 16px rgba(0,0,0,0.3)",
          }}
          type="button"
        >
          <Compass size={18} />
          <span>Start Exploring</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setCurrent(i)}
            data-ocid="landing.tab"
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: i === current ? "24px" : "7px",
              height: "7px",
              background: i === current ? "#F4B23C" : "rgba(255,255,255,0.3)",
              border: "none",
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Subtle vignette corners */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(6,13,24,0.5) 100%)",
        }}
      />
    </div>
  );
}
