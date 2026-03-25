import {
  Bike,
  Bus,
  Car,
  Clock,
  MapPin,
  Navigation2,
  Plane,
  Ruler,
  Train,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Monument, TransportMode } from "../types";

const TRANSPORT_SPEEDS: Record<TransportMode, number> = {
  CAR: 80,
  BUS: 50,
  TRAIN: 150,
  FLIGHT: 900,
  MOTORCYCLE: 70,
};

const TRANSPORT_ICONS = {
  CAR: Car,
  BUS: Bus,
  TRAIN: Train,
  FLIGHT: Plane,
  MOTORCYCLE: Bike,
};

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

interface RoutePlannerProps {
  monument: Monument | null;
  onClose: () => void;
  onRouteReady: (coords: [number, number][]) => void;
  userLocation: { lat: number; lng: number } | null;
  onRequestLocation: () => void;
}

export function RoutePlanner({
  monument,
  onClose,
  onRouteReady,
  userLocation,
  onRequestLocation,
}: RoutePlannerProps) {
  const [transportMode, setTransportMode] = useState<TransportMode>("CAR");
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    if (monument && userLocation) {
      const dist = haversineDistance(
        userLocation.lat,
        userLocation.lng,
        monument.latitude,
        monument.longitude,
      );
      setDistance(dist);
      setDuration(formatDuration(dist / TRANSPORT_SPEEDS[transportMode]));
      onRouteReady([
        [userLocation.lat, userLocation.lng],
        [monument.latitude, monument.longitude],
      ]);
    }
  }, [monument, userLocation, transportMode, onRouteReady]);

  return (
    <AnimatePresence>
      {monument && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute top-20 left-4 z-40 glass-panel rounded-2xl overflow-hidden"
          style={{ width: "280px", border: "1px solid rgba(42,58,85,0.9)" }}
          data-ocid="route_planner.panel"
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(42,58,85,0.8)" }}
          >
            <div className="flex items-center gap-2">
              <Navigation2 size={14} style={{ color: "#F4B23C" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#EAF0F8" }}
              >
                Route Planner
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="hover:text-white transition-colors"
              style={{ color: "#6E7F99" }}
              data-ocid="route_planner.close_button"
            >
              <X size={14} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <div
                className="text-xs font-medium mb-2"
                style={{ color: "#6E7F99" }}
              >
                Transport Mode
              </div>
              <div className="grid grid-cols-5 gap-1">
                {(Object.keys(TRANSPORT_ICONS) as TransportMode[]).map(
                  (mode) => {
                    const Icon = TRANSPORT_ICONS[mode];
                    return (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setTransportMode(mode)}
                        className="flex flex-col items-center gap-1 py-2 rounded-lg transition-all"
                        style={{
                          background:
                            transportMode === mode
                              ? "rgba(244,178,60,0.2)"
                              : "rgba(255,255,255,0.04)",
                          border:
                            transportMode === mode
                              ? "1px solid rgba(244,178,60,0.5)"
                              : "1px solid rgba(255,255,255,0.05)",
                          color: transportMode === mode ? "#F4B23C" : "#6E7F99",
                        }}
                        data-ocid={`route_planner.${mode.toLowerCase()}.toggle`}
                      >
                        <Icon size={14} />
                        <span className="text-[9px] font-medium">
                          {mode.charAt(0) +
                            mode.slice(1).toLowerCase().slice(0, 2)}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                {userLocation ? (
                  <span className="text-xs" style={{ color: "#A9B6C9" }}>
                    {userLocation.lat.toFixed(4)}°,{" "}
                    {userLocation.lng.toFixed(4)}°
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onRequestLocation}
                    className="text-xs hover:underline"
                    style={{ color: "#F4B23C" }}
                    data-ocid="route_planner.get_location_button"
                  >
                    Use my location
                  </button>
                )}
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <MapPin
                  size={10}
                  style={{ color: "#F4B23C" }}
                  className="shrink-0"
                />
                <span className="text-xs truncate" style={{ color: "#EAF0F8" }}>
                  {monument.name}
                </span>
              </div>
            </div>

            {userLocation && distance !== null && duration ? (
              <div
                className="p-3 rounded-xl space-y-2"
                style={{
                  background: "rgba(244,178,60,0.08)",
                  border: "1px solid rgba(244,178,60,0.2)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Ruler size={12} style={{ color: "#F4B23C" }} />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#EAF0F8" }}
                  >
                    {distance.toFixed(0)} km
                  </span>
                  <div className="flex-1" />
                  <Clock size={12} style={{ color: "#F4B23C" }} />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#EAF0F8" }}
                  >
                    {duration}
                  </span>
                </div>
                <div className="text-xs" style={{ color: "#6E7F99" }}>
                  Via{" "}
                  {transportMode.charAt(0) +
                    transportMode.slice(1).toLowerCase()}{" "}
                  at {TRANSPORT_SPEEDS[transportMode]} km/h
                </div>
              </div>
            ) : !userLocation ? (
              <div
                className="text-xs text-center py-2"
                style={{ color: "#6E7F99" }}
              >
                Enable location to see route info
              </div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
