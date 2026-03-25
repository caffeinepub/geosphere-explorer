interface CoordinatesDisplayProps {
  lat: number | null;
  lng: number | null;
}

export function CoordinatesDisplay({ lat, lng }: CoordinatesDisplayProps) {
  if (lat === null || lng === null) {
    return (
      <div
        className="glass-panel rounded-xl px-3 py-2"
        style={{ border: "1px solid rgba(42,58,85,0.9)" }}
        data-ocid="coordinates.panel"
      >
        <div className="text-xs font-mono" style={{ color: "#6E7F99" }}>
          Move cursor over globe
        </div>
      </div>
    );
  }

  const latStr = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`;
  const lngStr = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;

  return (
    <div
      className="glass-panel rounded-xl px-3 py-2"
      style={{ border: "1px solid rgba(42,58,85,0.9)" }}
      data-ocid="coordinates.panel"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium" style={{ color: "#6E7F99" }}>
            Lat:
          </span>
          <span
            className="text-xs font-mono font-medium"
            style={{ color: "#EAF0F8" }}
          >
            {latStr}
          </span>
        </div>
        <div
          className="w-px h-3"
          style={{ background: "rgba(42,58,85,0.8)" }}
        />
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium" style={{ color: "#6E7F99" }}>
            Lng:
          </span>
          <span
            className="text-xs font-mono font-medium"
            style={{ color: "#EAF0F8" }}
          >
            {lngStr}
          </span>
        </div>
      </div>
    </div>
  );
}
