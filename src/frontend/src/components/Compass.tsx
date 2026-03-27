import { useCallback, useEffect, useRef, useState } from "react";

function getCardinalLabel(heading: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const idx = Math.round(heading / 45) % 8;
  return dirs[idx];
}

type PermissionState = "unknown" | "granted" | "denied" | "pending";

export function Compass() {
  const [heading, setHeading] = useState(0);
  const [hasOrientation, setHasOrientation] = useState(false);
  const [permission, setPermission] = useState<PermissionState>("unknown");
  const listenersAdded = useRef(false);

  const addListeners = useCallback(() => {
    if (listenersAdded.current) return;
    listenersAdded.current = true;

    const onOrientation = (
      e: DeviceOrientationEvent & {
        webkitCompassHeading?: number;
        absolute?: boolean;
      },
    ) => {
      if (e.webkitCompassHeading != null) {
        setHeading(e.webkitCompassHeading);
        setHasOrientation(true);
        return;
      }
      if (e.alpha != null) {
        setHeading((360 - e.alpha) % 360);
        setHasOrientation(true);
      }
    };

    const handler = (e: Event) =>
      onOrientation(
        e as DeviceOrientationEvent & {
          webkitCompassHeading?: number;
          absolute?: boolean;
        },
      );

    window.addEventListener("deviceorientationabsolute", handler, true);
    window.addEventListener("deviceorientation", handler, true);
  }, []);

  useEffect(() => {
    const DevOrEvent = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DevOrEvent.requestPermission !== "function") {
      setPermission("granted");
      addListeners();
    }
  }, [addListeners]);

  const requestPermission = useCallback(() => {
    const DevOrEvent = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DevOrEvent.requestPermission === "function") {
      setPermission("pending");
      DevOrEvent.requestPermission()
        .then((state: string) => {
          if (state === "granted") {
            setPermission("granted");
            addListeners();
          } else {
            setPermission("denied");
          }
        })
        .catch(() => setPermission("denied"));
    }
  }, [addListeners]);

  const needsTap =
    typeof (
      DeviceOrientationEvent as unknown as { requestPermission?: unknown }
    ).requestPermission === "function" && permission === "unknown";

  const cardinalLabel = getCardinalLabel(heading);

  return (
    <div
      className="flex flex-col items-center gap-1 glass-panel rounded-2xl p-3"
      style={{ border: "1px solid rgba(42,58,85,0.9)", width: "80px" }}
      data-ocid="compass.panel"
    >
      <div className="text-xs font-medium mb-1" style={{ color: "#6E7F99" }}>
        Compass
      </div>

      <button
        type="button"
        className="relative w-12 h-12 bg-transparent border-0 p-0 cursor-pointer"
        onClick={needsTap ? requestPermission : undefined}
        title={needsTap ? "Tap to enable compass" : undefined}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          aria-label="Compass rose"
          style={{
            transform: `rotate(${-heading}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <title>Compass Rose</title>
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="rgba(42,58,85,0.8)"
            strokeWidth="2"
          />
          <text
            x="24"
            y="8"
            textAnchor="middle"
            fontSize="7"
            fill="#EF4444"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            N
          </text>
          <text
            x="24"
            y="44"
            textAnchor="middle"
            fontSize="7"
            fill="#EAF0F8"
            fontFamily="Inter, sans-serif"
          >
            S
          </text>
          <text
            x="42"
            y="27"
            textAnchor="middle"
            fontSize="7"
            fill="#EAF0F8"
            fontFamily="Inter, sans-serif"
          >
            E
          </text>
          <text
            x="6"
            y="27"
            textAnchor="middle"
            fontSize="7"
            fill="#EAF0F8"
            fontFamily="Inter, sans-serif"
          >
            W
          </text>
          <polygon points="24,12 21,26 24,23 27,26" fill="#EF4444" />
          <polygon
            points="24,36 21,22 24,25 27,22"
            fill="#EAF0F8"
            opacity="0.6"
          />
          <circle cx="24" cy="24" r="2" fill="#F4B23C" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 24 + 18 * Math.sin(rad);
            const y1 = 24 - 18 * Math.cos(rad);
            const x2 = 24 + 22 * Math.sin(rad);
            const y2 = 24 - 22 * Math.cos(rad);
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(110,127,153,0.6)"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </button>

      <div className="flex flex-col items-center gap-0.5">
        <div
          className="text-xs font-mono font-bold"
          style={{ color: hasOrientation ? "#EAF0F8" : "#6E7F99" }}
        >
          {hasOrientation ? cardinalLabel : "N"}
        </div>
        {hasOrientation && (
          <div className="text-[9px] font-mono" style={{ color: "#6E7F99" }}>
            {Math.round(heading)}°
          </div>
        )}
        {needsTap && (
          <div
            className="text-[8px] text-center leading-tight"
            style={{ color: "#6E7F99" }}
          >
            tap to enable
          </div>
        )}
        {permission === "pending" && (
          <div
            className="text-[8px] text-center leading-tight"
            style={{ color: "#F4B23C" }}
          >
            allow it
          </div>
        )}
        {permission === "denied" && (
          <div
            className="text-[8px] text-center leading-tight"
            style={{ color: "#EF4444" }}
          >
            denied
          </div>
        )}
      </div>
    </div>
  );
}
