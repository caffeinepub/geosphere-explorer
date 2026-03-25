import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Globe2, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Compass } from "./components/Compass";
import { CoordinatesDisplay } from "./components/CoordinatesDisplay";
import { MonumentModal } from "./components/MonumentModal";
import { RoutePlanner } from "./components/RoutePlanner";
import { SearchBar } from "./components/SearchBar";
import { ViewControls } from "./components/ViewControls";
import { useMonuments } from "./hooks/useQueries";
import type { Monument, ViewMode } from "./types";

const Globe3D = lazy(() =>
  import("./components/Globe3D").then((m) => ({ default: m.Globe3D })),
);
const MapView = lazy(() =>
  import("./components/MapView").then((m) => ({ default: m.MapView })),
);

const queryClient = new QueryClient();

function AppContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("globe");
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(
    null,
  );
  const [routeMonument, setRouteMonument] = useState<Monument | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(
    null,
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const leafletMapRef = useRef<import("leaflet").Map | null>(null);

  const { data: monuments = [], isLoading } = useMonuments();

  const handleMonumentSelect = useCallback((m: Monument) => {
    setSelectedMonument(m);
    setShowModal(true);
  }, []);

  const handleGetRoute = useCallback(
    (m: Monument) => {
      setRouteMonument(m);
      setShowRoutePlanner(true);
      setShowModal(false);
      if (!userLocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          () => {
            toast.error("Could not get your location. Using default.");
            setUserLocation({ lat: 0, lng: 0 });
          },
        );
      }
    },
    [userLocation],
  );

  const handleRequestLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        toast.success("Location found!");
      },
      () => {
        toast.error("Could not get your location.");
        setUserLocation({ lat: 0, lng: 0 });
      },
    );
  }, []);

  const handleZoomIn = useCallback(() => {
    if (viewMode !== "globe" && leafletMapRef.current) {
      leafletMapRef.current.zoomIn();
    }
  }, [viewMode]);

  const handleZoomOut = useCallback(() => {
    if (viewMode !== "globe" && leafletMapRef.current) {
      leafletMapRef.current.zoomOut();
    }
  }, [viewMode]);

  const handleCoordsChange = useCallback((lat: number, lng: number) => {
    setCoords({ lat, lng });
  }, []);

  return (
    <div
      className="starfield w-screen h-screen overflow-hidden relative select-none"
      data-ocid="app.page"
    >
      {/* MAIN CANVAS */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                  style={{
                    borderColor: "rgba(244,178,60,0.4)",
                    borderTopColor: "#F4B23C",
                  }}
                />
                <p className="text-sm" style={{ color: "#A9B6C9" }}>
                  Loading GeoSphere...
                </p>
              </div>
            </div>
          }
        >
          {viewMode === "globe" ? (
            <Globe3D
              monuments={monuments}
              onMonumentClick={handleMonumentSelect}
              selectedMonument={selectedMonument}
              onCoordsChange={handleCoordsChange}
            />
          ) : (
            <MapView
              viewMode={viewMode}
              monuments={monuments}
              selectedMonument={selectedMonument}
              onMonumentClick={handleMonumentSelect}
              onCoordsChange={handleCoordsChange}
              routeCoords={routeCoords}
              userLocation={userLocation}
            />
          )}
        </Suspense>
      </div>

      {/* HEADER */}
      <header
        className="absolute top-0 left-0 right-0 z-30 flex items-center gap-4 px-4 py-3"
        style={{
          background: "rgba(11,18,32,0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(42,58,85,0.6)",
        }}
      >
        <div className="flex items-center gap-2 shrink-0">
          <Globe2 size={22} style={{ color: "#F4B23C" }} />
          <span
            className="font-bold text-base tracking-tight"
            style={{ color: "#EAF0F8" }}
          >
            GeoSphere
          </span>
          <span
            className="hidden sm:block font-light text-sm"
            style={{ color: "#A9B6C9" }}
          >
            Explorer
          </span>
        </div>

        <div className="flex-1 flex justify-center">
          <SearchBar monuments={monuments} onSelect={handleMonumentSelect} />
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {["Explore", "Stories", "Gallery"].map((item) => (
            <button
              type="button"
              key={item}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/10"
              style={{ color: item === "Explore" ? "#F4B23C" : "#A9B6C9" }}
              data-ocid={`nav.${item.toLowerCase()}.link`}
            >
              {item}
            </button>
          ))}
        </nav>

        {isLoading && (
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-4 h-4 rounded-full border border-t-transparent animate-spin"
              style={{
                borderColor: "rgba(244,178,60,0.4)",
                borderTopColor: "#F4B23C",
              }}
            />
            <span
              className="text-xs hidden sm:block"
              style={{ color: "#6E7F99" }}
            >
              Loading...
            </span>
          </div>
        )}
      </header>

      {/* ROUTE PLANNER */}
      <RoutePlanner
        monument={showRoutePlanner ? routeMonument : null}
        onClose={() => {
          setShowRoutePlanner(false);
          setRouteCoords(null);
        }}
        onRouteReady={setRouteCoords}
        userLocation={userLocation}
        onRequestLocation={handleRequestLocation}
      />

      {/* MONUMENT MODAL */}
      <MonumentModal
        monument={showModal ? selectedMonument : null}
        onClose={() => setShowModal(false)}
        onGetRoute={handleGetRoute}
      />

      {/* BOTTOM-LEFT: Coordinates */}
      <div
        className="absolute bottom-4 left-4 z-20"
        data-ocid="coordinates.section"
      >
        <CoordinatesDisplay
          lat={coords?.lat ?? null}
          lng={coords?.lng ?? null}
        />
      </div>

      {/* BOTTOM-RIGHT: Controls + Compass */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
        <ViewControls
          viewMode={viewMode}
          onViewChange={setViewMode}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
        <Compass />
      </div>

      {/* MONUMENT COUNT BADGE */}
      <div
        className="absolute top-16 right-4 z-20 glass-panel rounded-xl px-3 py-2 flex items-center gap-2"
        style={{ border: "1px solid rgba(42,58,85,0.9)" }}
      >
        <Star size={12} style={{ color: "#F4B23C" }} />
        <span className="text-xs font-medium" style={{ color: "#A9B6C9" }}>
          {monuments.length} Monuments
        </span>
      </div>

      {/* FEATURED MONUMENTS strip */}
      <AnimatePresence>
        {!showModal && !showRoutePlanner && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ delay: 0.5, type: "spring", damping: 20 }}
            className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2"
            style={{ width: "min(700px, 90vw)" }}
          >
            <div
              className="glass-panel rounded-2xl p-3"
              style={{ border: "1px solid rgba(42,58,85,0.9)" }}
            >
              <div
                className="text-xs font-medium mb-2 px-1"
                style={{ color: "#6E7F99" }}
              >
                Featured Monuments
              </div>
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {monuments.slice(0, 10).map((m, i) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => handleMonumentSelect(m)}
                    className="flex flex-col items-center gap-1.5 shrink-0 group"
                    style={{ width: "60px" }}
                    data-ocid={`featured.item.${i + 1}`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center transition-all group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${m.imageUrl})`,
                        boxShadow:
                          selectedMonument?.id === m.id
                            ? "0 0 0 2px #F4B23C"
                            : "none",
                      }}
                    />
                    <span
                      className="text-[9px] text-center leading-tight line-clamp-2"
                      style={{ color: "#A9B6C9" }}
                    >
                      {m.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center py-1.5"
        style={{
          background: "rgba(11,18,32,0.6)",
          borderTop: "1px solid rgba(42,58,85,0.4)",
        }}
      >
        <p className="text-[10px]" style={{ color: "#6E7F99" }}>
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            style={{ color: "#F4B23C" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
