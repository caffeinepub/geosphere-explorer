import { Html, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Monument } from "../types";

const EARTH_TEXTURE =
  "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg";

const COUNTRY_LABELS = [
  { name: "USA", lat: 38, lng: -97 },
  { name: "CANADA", lat: 56, lng: -96 },
  { name: "RUSSIA", lat: 60, lng: 90 },
  { name: "CHINA", lat: 35, lng: 105 },
  { name: "BRAZIL", lat: -10, lng: -53 },
  { name: "AUSTRALIA", lat: -25, lng: 133 },
  { name: "INDIA", lat: 20, lng: 78 },
  { name: "EUROPE", lat: 50, lng: 15 },
  { name: "AFRICA", lat: 0, lng: 20 },
  { name: "ARGENTINA", lat: -35, lng: -65 },
  { name: "MEXICO", lat: 23, lng: -102 },
  { name: "JAPAN", lat: 36, lng: 138 },
  { name: "SAUDI ARABIA", lat: 24, lng: 45 },
  { name: "INDONESIA", lat: -5, lng: 120 },
  { name: "ALASKA", lat: 64, lng: -153 },
];

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createGridLines(): THREE.BufferGeometry {
  const points: number[] = [];
  const segments = 128;
  for (let lat = -90; lat <= 90; lat += 30) {
    for (let i = 0; i < segments; i++) {
      const lng1 = (i / segments) * 360 - 180;
      const lng2 = ((i + 1) / segments) * 360 - 180;
      const v1 = latLngToVec3(lat, lng1, 1.001);
      const v2 = latLngToVec3(lat, lng2, 1.001);
      points.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    }
  }
  for (let lng = -180; lng < 180; lng += 30) {
    for (let i = 0; i < segments; i++) {
      const lat1 = (i / segments) * 180 - 90;
      const lat2 = ((i + 1) / segments) * 180 - 90;
      const v1 = latLngToVec3(lat1, lng, 1.001);
      const v2 = latLngToVec3(lat2, lng, 1.001);
      points.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    }
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  return geom;
}

interface PinProps {
  monument: Monument;
  onHover: (m: Monument | null) => void;
  onClick: (m: Monument) => void;
  isSelected: boolean;
}

function MonumentPin({ monument, onHover, onClick, isSelected }: PinProps) {
  const pos = latLngToVec3(monument.latitude, monument.longitude, 1.03);
  const [hovered, setHovered] = useState(false);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Three.js R3F mesh, not a DOM element
    <mesh
      position={pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(monument);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(monument);
      }}
    >
      <sphereGeometry args={[isSelected ? 0.025 : 0.018, 8, 8]} />
      <meshStandardMaterial
        color={hovered || isSelected ? "#F4B23C" : "#E6A12B"}
        emissive={hovered || isSelected ? "#F4B23C" : "#E6A12B"}
        emissiveIntensity={hovered || isSelected ? 1.5 : 0.8}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

interface EarthProps {
  monuments: Monument[];
  onMonumentHover: (m: Monument | null) => void;
  onMonumentClick: (m: Monument) => void;
  selectedMonument: Monument | null;
  cameraDistance: React.MutableRefObject<number>;
  rotation: React.MutableRefObject<{ x: number; y: number }>;
}

function Earth({
  monuments,
  onMonumentHover,
  onMonumentClick,
  selectedMonument,
  cameraDistance,
  rotation,
}: EarthProps) {
  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(EARTH_TEXTURE);
  const gridGeom = useRef(createGridLines());
  const { camera } = useThree();

  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      cameraDistance.current = camera.position.length();
    }
    if (groupRef.current) {
      rotation.current = {
        x: groupRef.current.rotation.x,
        y: groupRef.current.rotation.y,
      };
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={texture}
          specular={new THREE.Color(0x333333)}
          shininess={15}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.025, 32, 32]} />
        <meshPhongMaterial
          color={new THREE.Color(0x4488ff)}
          transparent
          opacity={0.07}
          side={THREE.FrontSide}
        />
      </mesh>
      <lineSegments geometry={gridGeom.current}>
        <lineBasicMaterial color={0x4a6080} transparent opacity={0.3} />
      </lineSegments>
      {monuments.map((m) => (
        <MonumentPin
          key={m.id}
          monument={m}
          onHover={onMonumentHover}
          onClick={onMonumentClick}
          isSelected={selectedMonument?.id === m.id}
        />
      ))}
      {COUNTRY_LABELS.map((c) => {
        const labelPos = latLngToVec3(c.lat, c.lng, 1.12);
        return (
          <Html key={c.name} position={labelPos} center distanceFactor={3.5}>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "10px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "1px",
                textShadow: "0 0 4px rgba(0,0,0,0.8)",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              {c.name}
            </div>
          </Html>
        );
      })}
    </group>
  );
}

interface GlobeDragState {
  dragging: boolean;
  lastX: number;
  lastY: number;
  rotX: number;
  rotY: number;
  velX: number;
  velY: number;
}

function GlobeScene({
  monuments,
  onMonumentHover,
  onMonumentClick,
  selectedMonument,
  cameraDistance,
  rotation,
}: EarthProps) {
  const { camera, gl } = useThree();
  const drag = useRef<GlobeDragState>({
    dragging: false,
    lastX: 0,
    lastY: 0,
    rotX: 0.3,
    rotY: 0,
    velX: 0.001,
    velY: 0,
  });
  const groupRef2 = useRef<THREE.Group>(null);

  useEffect(() => {
    const canvas = gl.domElement;
    const onMouseDown = (e: MouseEvent) => {
      drag.current.dragging = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      drag.current.velX = 0;
      drag.current.velY = 0;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!drag.current.dragging) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.rotY += dx * 0.005;
      drag.current.rotX += dy * 0.005;
      drag.current.rotX = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, drag.current.rotX),
      );
      drag.current.velX = dx * 0.005;
      drag.current.velY = dy * 0.005;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
    };
    const onMouseUp = () => {
      drag.current.dragging = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cam = camera as THREE.PerspectiveCamera;
      const factor = e.deltaY > 0 ? 1.1 : 0.9;
      const newDist = Math.max(
        1.4,
        Math.min(6, cam.position.length() * factor),
      );
      cam.position.normalize().multiplyScalar(newDist);
      cam.updateProjectionMatrix();
    };
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [camera, gl]);

  useFrame(() => {
    if (!groupRef2.current) return;
    if (!drag.current.dragging) {
      drag.current.velX *= 0.95;
      drag.current.velY *= 0.95;
      drag.current.rotY += drag.current.velX || 0.001;
    }
    groupRef2.current.rotation.x = drag.current.rotX;
    groupRef2.current.rotation.y = drag.current.rotY;
    rotation.current = { x: drag.current.rotX, y: drag.current.rotY };
    cameraDistance.current = (
      camera as THREE.PerspectiveCamera
    ).position.length();
  });

  return (
    <group ref={groupRef2}>
      <Earth
        monuments={monuments}
        onMonumentHover={onMonumentHover}
        onMonumentClick={onMonumentClick}
        selectedMonument={selectedMonument}
        cameraDistance={cameraDistance}
        rotation={rotation}
      />
    </group>
  );
}

interface Globe3DProps {
  monuments: Monument[];
  onMonumentClick: (m: Monument) => void;
  selectedMonument: Monument | null;
  onCoordsChange?: (lat: number, lng: number) => void;
}

export function Globe3D({
  monuments,
  onMonumentClick,
  selectedMonument,
  onCoordsChange,
}: Globe3DProps) {
  const [hoveredMonument, setHoveredMonument] = useState<Monument | null>(null);
  const cameraDistance = useRef(2.5);
  const rotation = useRef({ x: 0.3, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!onCoordsChange || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      onCoordsChange(y * 90, x * 180);
    },
    [onCoordsChange],
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} />
        <Suspense fallback={null}>
          <GlobeScene
            monuments={monuments}
            onMonumentHover={setHoveredMonument}
            onMonumentClick={onMonumentClick}
            selectedMonument={selectedMonument}
            cameraDistance={cameraDistance}
            rotation={rotation}
          />
        </Suspense>
      </Canvas>
      {hoveredMonument && (
        <div
          className="absolute pointer-events-none z-30 px-3 py-2 glass-panel rounded-lg text-sm"
          style={{ top: "20%", left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="font-semibold" style={{ color: "#F4B23C" }}>
            {hoveredMonument.name}
          </div>
          <div className="text-xs" style={{ color: "#A9B6C9" }}>
            {hoveredMonument.city}, {hoveredMonument.country}
          </div>
        </div>
      )}
    </div>
  );
}
