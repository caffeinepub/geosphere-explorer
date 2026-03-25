import L from "leaflet";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Monument, ViewMode } from "../types";

// Fix leaflet default icon issue
(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl =
  undefined;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const amberIcon = new L.DivIcon({
  html: `<div style="width:12px;height:12px;background:#F4B23C;border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px rgba(244,178,60,0.8);"></div>`,
  className: "custom-monument-marker",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const selectedIcon = new L.DivIcon({
  html: `<div style="width:18px;height:18px;background:#F4B23C;border-radius:50%;border:3px solid #fff;box-shadow:0 0 16px rgba(244,178,60,1);"></div>`,
  className: "custom-monument-marker",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

interface MapEventsProps {
  onCoordsChange: (lat: number, lng: number) => void;
}

function MapEvents({ onCoordsChange }: MapEventsProps) {
  useMapEvents({
    mousemove(e) {
      onCoordsChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapViewProps {
  viewMode: ViewMode;
  monuments: Monument[];
  selectedMonument: Monument | null;
  onMonumentClick: (m: Monument) => void;
  onCoordsChange: (lat: number, lng: number) => void;
  routeCoords?: [number, number][] | null;
  userLocation?: { lat: number; lng: number } | null;
}

export function MapView({
  viewMode,
  monuments,
  selectedMonument,
  onMonumentClick,
  onCoordsChange,
  routeCoords,
  userLocation,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (selectedMonument && mapRef.current) {
      mapRef.current.flyTo(
        [selectedMonument.latitude, selectedMonument.longitude],
        10,
        { duration: 1.5 },
      );
    }
  }, [selectedMonument]);

  const osmTile = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const satTile =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ width: "100%", height: "100%" }}
      ref={mapRef}
      zoomControl={false}
    >
      <TileLayer
        url={viewMode === "satellite" ? satTile : osmTile}
        attribution={viewMode === "satellite" ? "Esri" : "© OpenStreetMap"}
      />
      <MapEvents onCoordsChange={onCoordsChange} />
      {monuments.map((m) => (
        <Marker
          key={m.id}
          position={[m.latitude, m.longitude]}
          icon={selectedMonument?.id === m.id ? selectedIcon : amberIcon}
          eventHandlers={{ click: () => onMonumentClick(m) }}
        >
          <Popup>
            <div
              style={{
                background: "#0e1624",
                color: "#EAF0F8",
                padding: "8px",
                borderRadius: "8px",
                minWidth: "150px",
              }}
            >
              <div style={{ fontWeight: "600", color: "#F4B23C" }}>
                {m.name}
              </div>
              <div style={{ fontSize: "12px", color: "#A9B6C9" }}>
                {m.city}, {m.country}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={
            new L.DivIcon({
              html: `<div style="width:14px;height:14px;background:#60a5fa;border-radius:50%;border:3px solid #fff;box-shadow:0 0 12px rgba(96,165,250,0.8);"></div>`,
              className: "custom-monument-marker",
              iconSize: [14, 14],
              iconAnchor: [7, 7],
            })
          }
        />
      )}
      {routeCoords && routeCoords.length > 1 && (
        <Polyline
          positions={routeCoords}
          color="#F4B23C"
          weight={3}
          dashArray="8,6"
          opacity={0.9}
        />
      )}
    </MapContainer>
  );
}
