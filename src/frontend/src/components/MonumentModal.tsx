import { Clock, Eye, Globe, MapPin, Navigation, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Monument } from "../types";

interface MonumentModalProps {
  monument: Monument | null;
  onClose: () => void;
  onGetRoute: (m: Monument) => void;
}

export function MonumentModal({
  monument,
  onClose,
  onGetRoute,
}: MonumentModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "street" | "map">("info");

  return (
    <AnimatePresence>
      {monument && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 h-full z-40 flex flex-col glass-panel"
          style={{
            width: "min(420px, 95vw)",
            borderLeft: "1px solid rgba(42,58,85,0.9)",
            borderRight: "none",
            borderTop: "none",
            borderBottom: "none",
          }}
          data-ocid="monument.modal"
        >
          <div className="relative h-56 shrink-0">
            <img
              src={monument.imageUrl}
              alt={monument.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(11,18,32,0.3) 0%, rgba(11,18,32,0.95) 100%)",
              }}
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              style={{ background: "rgba(0,0,0,0.5)" }}
              data-ocid="monument.close_button"
            >
              <X size={16} className="text-white" />
            </button>
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="text-xl font-bold text-white">{monument.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={12} style={{ color: "#F4B23C" }} />
                <span className="text-sm" style={{ color: "#A9B6C9" }}>
                  {monument.city}, {monument.country}
                </span>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(244,178,60,0.2)",
                    color: "#F4B23C",
                  }}
                >
                  {monument.category}
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex border-b"
            style={{ borderColor: "rgba(42,58,85,0.8)" }}
          >
            {(["info", "street", "map"] as const).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-xs font-medium capitalize transition-colors"
                style={{
                  color: activeTab === tab ? "#F4B23C" : "#6E7F99",
                  borderBottom:
                    activeTab === tab
                      ? "2px solid #F4B23C"
                      : "2px solid transparent",
                }}
                data-ocid={`monument.${tab}.tab`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  {tab === "info" && <Clock size={12} />}
                  {tab === "street" && <Eye size={12} />}
                  {tab === "map" && <Globe size={12} />}
                  {tab}
                </div>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "info" && (
              <div className="space-y-4">
                <div>
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{ color: "#F4B23C" }}
                  >
                    About
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#A9B6C9" }}
                  >
                    {monument.description}
                  </p>
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{ color: "#F4B23C" }}
                  >
                    History
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#A9B6C9" }}
                  >
                    {monument.history}
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{
                    background: "rgba(244,178,60,0.08)",
                    border: "1px solid rgba(244,178,60,0.2)",
                  }}
                >
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: "#F4B23C" }}
                  >
                    Coordinates
                  </div>
                  <div
                    className="text-xs font-mono"
                    style={{ color: "#A9B6C9" }}
                  >
                    {monument.latitude.toFixed(4)}°
                    {monument.latitude >= 0 ? "N" : "S"} &nbsp;
                    {Math.abs(monument.longitude).toFixed(4)}°
                    {monument.longitude >= 0 ? "E" : "W"}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "street" && (
              <div className="space-y-3">
                <div className="text-xs" style={{ color: "#6E7F99" }}>
                  Street view for {monument.city}
                </div>
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ height: "400px" }}
                >
                  <iframe
                    title={`Street view of ${monument.name}`}
                    src={`https://maps.google.com/maps?q=${monument.latitude},${monument.longitude}&output=embed&z=15`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
            {activeTab === "map" && (
              <div className="space-y-3">
                <div className="text-xs" style={{ color: "#6E7F99" }}>
                  Location map
                </div>
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ height: "400px" }}
                >
                  <iframe
                    title={`Map of ${monument.name}`}
                    src={`https://maps.google.com/maps?q=${monument.latitude},${monument.longitude}&output=embed&z=13&t=k`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className="p-4 shrink-0"
            style={{ borderTop: "1px solid rgba(42,58,85,0.8)" }}
          >
            <button
              type="button"
              onClick={() => onGetRoute(monument)}
              className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #F4B23C, #E6A12B)",
                color: "#0B1220",
              }}
              data-ocid="monument.get_route_button"
            >
              <Navigation size={16} />
              Get Route to This Monument
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
