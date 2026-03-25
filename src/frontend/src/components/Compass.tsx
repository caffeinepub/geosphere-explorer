export function Compass() {
  return (
    <div
      className="flex flex-col items-center gap-1 glass-panel rounded-2xl p-3"
      style={{ border: "1px solid rgba(42,58,85,0.9)", width: "80px" }}
      data-ocid="compass.panel"
    >
      <div className="text-xs font-medium mb-1" style={{ color: "#6E7F99" }}>
        Compass
      </div>
      <div className="relative w-12 h-12">
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          role="img"
          aria-label="Compass rose"
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
      </div>
      <div className="text-xs font-mono" style={{ color: "#A9B6C9" }}>
        N
      </div>
    </div>
  );
}
