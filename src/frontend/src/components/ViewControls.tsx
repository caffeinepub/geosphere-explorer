import { Globe, Map as MapIcon, Satellite } from "lucide-react";
import type { ViewMode } from "../types";

interface ViewControlsProps {
  viewMode: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

export function ViewControls({ viewMode, onViewChange }: ViewControlsProps) {
  return (
    <div className="flex flex-col gap-2" data-ocid="view_controls.panel">
      <div
        className="glass-panel rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(42,58,85,0.9)" }}
      >
        {(["globe", "map", "satellite"] as ViewMode[]).map((mode) => {
          const Icon =
            mode === "globe" ? Globe : mode === "map" ? MapIcon : Satellite;
          const label =
            mode === "globe" ? "3D" : mode === "map" ? "Map" : "Sat";
          return (
            <button
              type="button"
              key={mode}
              onClick={() => onViewChange(mode)}
              className="flex items-center gap-2 w-full px-3 py-2.5 text-xs font-medium transition-all"
              style={{
                background:
                  viewMode === mode ? "rgba(244,178,60,0.15)" : "transparent",
                color: viewMode === mode ? "#F4B23C" : "#6E7F99",
                borderBottom:
                  mode !== "satellite"
                    ? "1px solid rgba(42,58,85,0.5)"
                    : "none",
              }}
              data-ocid={`view_controls.${mode}.tab`}
            >
              <Icon size={12} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
