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
  { name: "ARGENTINA", lat: -35, lng: -65 },
  { name: "MEXICO", lat: 23, lng: -102 },
  { name: "JAPAN", lat: 36, lng: 138 },
  { name: "SAUDI ARABIA", lat: 24, lng: 45 },
  { name: "INDONESIA", lat: -5, lng: 120 },
];

const STATE_LABELS = [
  // USA
  { name: "California", lat: 37, lng: -120 },
  { name: "Texas", lat: 31, lng: -100 },
  { name: "New York", lat: 43, lng: -75 },
  { name: "Florida", lat: 28, lng: -82 },
  { name: "Illinois", lat: 40, lng: -89 },
  { name: "Arizona", lat: 34, lng: -111 },
  { name: "Alaska", lat: 64, lng: -153 },
  { name: "Hawaii", lat: 20, lng: -157 },
  { name: "Washington", lat: 47, lng: -120 },
  { name: "Colorado", lat: 39, lng: -105 },
  { name: "Nevada", lat: 39, lng: -117 },
  { name: "Michigan", lat: 44, lng: -85 },
  { name: "Georgia", lat: 32, lng: -83 },
  { name: "North Carolina", lat: 35, lng: -79 },
  { name: "Ohio", lat: 40, lng: -82 },
  // India
  { name: "Rajasthan", lat: 27, lng: 74 },
  { name: "Maharashtra", lat: 19, lng: 76 },
  { name: "Karnataka", lat: 15, lng: 75 },
  { name: "Tamil Nadu", lat: 11, lng: 78 },
  { name: "Gujarat", lat: 22, lng: 71 },
  { name: "Uttar Pradesh", lat: 27, lng: 80 },
  { name: "West Bengal", lat: 23, lng: 87 },
  { name: "Punjab", lat: 31, lng: 75 },
  { name: "Kerala", lat: 10, lng: 76 },
  { name: "Madhya Pradesh", lat: 23, lng: 78 },
  { name: "Andhra Pradesh", lat: 15, lng: 79 },
  { name: "Bihar", lat: 25, lng: 85 },
  { name: "Odisha", lat: 20, lng: 84 },
  { name: "Jharkhand", lat: 23, lng: 85 },
  { name: "Uttarakhand", lat: 30, lng: 79 },
  // Canada
  { name: "Ontario", lat: 50, lng: -85 },
  { name: "Quebec", lat: 53, lng: -70 },
  { name: "British Columbia", lat: 54, lng: -125 },
  { name: "Alberta", lat: 54, lng: -115 },
  { name: "Manitoba", lat: 55, lng: -97 },
  // Australia
  { name: "New South Wales", lat: -32, lng: 146 },
  { name: "Victoria", lat: -37, lng: 145 },
  { name: "Queensland", lat: -22, lng: 144 },
  { name: "Western Australia", lat: -26, lng: 122 },
  { name: "South Australia", lat: -30, lng: 135 },
  // Brazil
  { name: "São Paulo", lat: -22, lng: -48 },
  { name: "Rio de Janeiro", lat: -22, lng: -43 },
  { name: "Minas Gerais", lat: -18, lng: -44 },
  { name: "Bahia", lat: -13, lng: -41 },
  { name: "Amazonas", lat: -4, lng: -62 },
  // Russia
  { name: "Siberia", lat: 60, lng: 105 },
  { name: "Ural", lat: 59, lng: 59 },
  { name: "Yakutia", lat: 63, lng: 130 },
  // China
  { name: "Xinjiang", lat: 41, lng: 85 },
  { name: "Tibet", lat: 31, lng: 88 },
  { name: "Inner Mongolia", lat: 44, lng: 113 },
  { name: "Sichuan", lat: 30, lng: 103 },
  { name: "Guangdong", lat: 23, lng: 113 },
  // Europe
  { name: "Bavaria", lat: 48, lng: 12 },
  { name: "Île-de-France", lat: 48, lng: 2 },
  { name: "Catalonia", lat: 41, lng: 1 },
  { name: "Lombardy", lat: 45, lng: 9 },
  { name: "Scotland", lat: 57, lng: -4 },
  { name: "Andalusia", lat: 37, lng: -5 },
  { name: "Tuscany", lat: 43, lng: 11 },
];

interface CityLabel {
  name: string;
  lat: number;
  lng: number;
  localName?: string;
}

const CITY_LABELS: CityLabel[] = [
  // India - major cities
  { name: "Delhi", lat: 28.6139, lng: 77.209, localName: "दिल्ली" },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, localName: "मुम्बई" },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, localName: "कोलकाता" },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, localName: "चेन्नई" },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, localName: "बेंगलुरु" },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867, localName: "హైదరాబాద్" },
  { name: "Pune", lat: 18.5204, lng: 73.8567, localName: "पुणे" },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, localName: "अहमदाबाद" },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, localName: "जयपुर" },
  { name: "Surat", lat: 21.1702, lng: 72.8311, localName: "सूरत" },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462, localName: "लखनऊ" },
  { name: "Kanpur", lat: 26.4499, lng: 80.3319, localName: "कानपुर" },
  { name: "Nagpur", lat: 21.1458, lng: 79.0882, localName: "नागपुर" },
  { name: "Indore", lat: 22.7196, lng: 75.8577, localName: "इंदौर" },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126, localName: "भोपाल" },
  { name: "Patna", lat: 25.5941, lng: 85.1376, localName: "पटना" },
  { name: "Vadodara", lat: 22.3072, lng: 73.1812, localName: "" },
  { name: "Ludhiana", lat: 30.901, lng: 75.8573, localName: "" },
  { name: "Agra", lat: 27.1767, lng: 78.0081, localName: "आगरा" },
  { name: "Nashik", lat: 20.0059, lng: 73.7898, localName: "" },
  { name: "Faridabad", lat: 28.4089, lng: 77.3178, localName: "" },
  { name: "Meerut", lat: 28.9845, lng: 77.7064, localName: "" },
  { name: "Rajkot", lat: 22.3039, lng: 70.8022, localName: "" },
  { name: "Varanasi", lat: 25.3176, lng: 82.9739, localName: "वाराणसी" },
  { name: "Srinagar", lat: 34.0837, lng: 74.7973, localName: "श्रीनगर" },
  { name: "Aurangabad", lat: 19.8762, lng: 75.3433, localName: "" },
  { name: "Amritsar", lat: 31.634, lng: 74.8723, localName: "अमृतसर" },
  { name: "Ranchi", lat: 23.3441, lng: 85.3096, localName: "" },
  { name: "Jabalpur", lat: 23.1815, lng: 79.9864, localName: "" },
  { name: "Gwalior", lat: 26.2183, lng: 78.1828, localName: "ग्वालियर" },
  { name: "Coimbatore", lat: 11.0168, lng: 76.9558, localName: "கோயம்புத்தூர்" },
  { name: "Vijayawada", lat: 16.5062, lng: 80.648, localName: "విజయవాడ" },
  { name: "Jodhpur", lat: 26.2389, lng: 73.0243, localName: "जोधपुर" },
  { name: "Madurai", lat: 9.9252, lng: 78.1198, localName: "மதுரை" },
  { name: "Raipur", lat: 21.2514, lng: 81.6296, localName: "" },
  { name: "Kota", lat: 25.2138, lng: 75.8648, localName: "कोटा" },
  { name: "Chandigarh", lat: 30.7333, lng: 76.7794, localName: "चंडीगढ़" },
  { name: "Guwahati", lat: 26.1445, lng: 91.7362, localName: "" },
  { name: "Solapur", lat: 17.6805, lng: 75.9064, localName: "" },
  { name: "Dehradun", lat: 30.3165, lng: 78.0322, localName: "" },
  { name: "Pushkar", lat: 26.4898, lng: 74.5511, localName: "" },
  { name: "Ajmer", lat: 26.4499, lng: 74.6399, localName: "अजमेर" },
  { name: "Udaipur", lat: 24.5854, lng: 73.7125, localName: "उदयपुर" },
  { name: "Bikaner", lat: 28.0229, lng: 73.3119, localName: "बीकानेर" },
  { name: "Alwar", lat: 27.5634, lng: 76.6346, localName: "" },
  { name: "Pali", lat: 25.7711, lng: 73.3234, localName: "पाली" },
  { name: "Barmer", lat: 25.7521, lng: 71.3967, localName: "बाड़मेर" },
  { name: "Sikar", lat: 27.6094, lng: 75.1397, localName: "" },
  { name: "Jhunjhunu", lat: 28.1312, lng: 75.3998, localName: "" },
  { name: "Churu", lat: 28.2996, lng: 74.9682, localName: "" },
  { name: "Nagaur", lat: 27.2025, lng: 73.7339, localName: "" },
  { name: "Hanumangarh", lat: 29.5804, lng: 74.3291, localName: "" },
  // Europe
  { name: "London", lat: 51.5074, lng: -0.1278, localName: "" },
  { name: "Paris", lat: 48.8566, lng: 2.3522, localName: "" },
  { name: "Berlin", lat: 52.52, lng: 13.405, localName: "" },
  { name: "Madrid", lat: 40.4168, lng: -3.7038, localName: "" },
  { name: "Rome", lat: 41.9028, lng: 12.4964, localName: "" },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041, localName: "" },
  { name: "Brussels", lat: 50.8503, lng: 4.3517, localName: "" },
  { name: "Vienna", lat: 48.2082, lng: 16.3738, localName: "" },
  { name: "Zurich", lat: 47.3769, lng: 8.5417, localName: "" },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686, localName: "" },
  { name: "Oslo", lat: 59.9139, lng: 10.7522, localName: "" },
  { name: "Copenhagen", lat: 55.6761, lng: 12.5683, localName: "" },
  { name: "Helsinki", lat: 60.1699, lng: 24.9384, localName: "" },
  { name: "Warsaw", lat: 52.2297, lng: 21.0122, localName: "" },
  { name: "Prague", lat: 50.0755, lng: 14.4378, localName: "" },
  { name: "Budapest", lat: 47.4979, lng: 19.0402, localName: "" },
  { name: "Athens", lat: 37.9838, lng: 23.7275, localName: "Αθήνα" },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784, localName: "" },
  { name: "Lisbon", lat: 38.7223, lng: -9.1393, localName: "" },
  { name: "Dublin", lat: 53.3498, lng: -6.2603, localName: "" },
  { name: "Edinburgh", lat: 55.9533, lng: -3.1883, localName: "" },
  { name: "Barcelona", lat: 41.3851, lng: 2.1734, localName: "" },
  { name: "Milan", lat: 45.4654, lng: 9.1859, localName: "" },
  { name: "Munich", lat: 48.1351, lng: 11.582, localName: "" },
  { name: "Hamburg", lat: 53.5753, lng: 10.0153, localName: "" },
  // Russia/CIS
  { name: "Moscow", lat: 55.7558, lng: 37.6173, localName: "Москва" },
  {
    name: "St. Petersburg",
    lat: 59.9311,
    lng: 30.3609,
    localName: "Санкт-Петербург",
  },
  { name: "Novosibirsk", lat: 54.9885, lng: 82.9207, localName: "" },
  { name: "Yekaterinburg", lat: 56.8389, lng: 60.6057, localName: "" },
  // Asia
  { name: "Beijing", lat: 39.9042, lng: 116.4074, localName: "北京" },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737, localName: "上海" },
  { name: "Guangzhou", lat: 23.1291, lng: 113.2644, localName: "广州" },
  { name: "Shenzhen", lat: 22.5431, lng: 114.0579, localName: "深圳" },
  { name: "Chengdu", lat: 30.5728, lng: 104.0668, localName: "成都" },
  { name: "Chongqing", lat: 29.5637, lng: 106.5504, localName: "重庆" },
  { name: "Wuhan", lat: 30.5928, lng: 114.3055, localName: "武汉" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, localName: "東京" },
  { name: "Osaka", lat: 34.6937, lng: 135.5023, localName: "大阪" },
  { name: "Kyoto", lat: 35.0116, lng: 135.7681, localName: "京都" },
  { name: "Seoul", lat: 37.5665, lng: 126.978, localName: "서울" },
  { name: "Busan", lat: 35.1796, lng: 129.0756, localName: "부산" },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018, localName: "กรุงเทพมหานคร" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, localName: "" },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456, localName: "" },
  { name: "Manila", lat: 14.5995, lng: 120.9842, localName: "" },
  { name: "Kuala Lumpur", lat: 3.139, lng: 101.6869, localName: "" },
  { name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297, localName: "" },
  { name: "Hanoi", lat: 21.0285, lng: 105.8542, localName: "" },
  { name: "Karachi", lat: 24.8607, lng: 67.0011, localName: "" },
  { name: "Lahore", lat: 31.5204, lng: 74.3587, localName: "" },
  { name: "Dhaka", lat: 23.8103, lng: 90.4125, localName: "" },
  { name: "Colombo", lat: 6.9271, lng: 79.8612, localName: "" },
  { name: "Kabul", lat: 34.5553, lng: 69.2075, localName: "" },
  { name: "Tehran", lat: 35.6892, lng: 51.389, localName: "تهران" },
  { name: "Baghdad", lat: 33.3152, lng: 44.3661, localName: "بغداد" },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753, localName: "الرياض" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, localName: "دبي" },
  { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773, localName: "" },
  { name: "Doha", lat: 25.2854, lng: 51.531, localName: "" },
  { name: "Kuwait City", lat: 29.3759, lng: 47.9774, localName: "الكويت" },
  { name: "Muscat", lat: 23.588, lng: 58.3829, localName: "" },
  { name: "Beirut", lat: 33.8938, lng: 35.5018, localName: "بيروت" },
  { name: "Amman", lat: 31.9454, lng: 35.9284, localName: "عمّان" },
  { name: "Tel Aviv", lat: 32.0853, lng: 34.7818, localName: "" },
  { name: "Jerusalem", lat: 31.7683, lng: 35.2137, localName: "ירושלים" },
  { name: "Tashkent", lat: 41.2995, lng: 69.2401, localName: "" },
  { name: "Almaty", lat: 43.222, lng: 76.8512, localName: "" },
  // Africa
  { name: "Cairo", lat: 30.0444, lng: 31.2357, localName: "القاهرة" },
  { name: "Lagos", lat: 6.5244, lng: 3.3792, localName: "" },
  { name: "Nairobi", lat: -1.2921, lng: 36.8219, localName: "" },
  { name: "Johannesburg", lat: -26.2041, lng: 28.0473, localName: "" },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241, localName: "" },
  { name: "Casablanca", lat: 33.5731, lng: -7.5898, localName: "" },
  { name: "Addis Ababa", lat: 9.145, lng: 40.4897, localName: "" },
  { name: "Accra", lat: 5.6037, lng: -0.187, localName: "" },
  { name: "Dar es Salaam", lat: -6.7924, lng: 39.2083, localName: "" },
  { name: "Khartoum", lat: 15.5007, lng: 32.5599, localName: "" },
  { name: "Tunis", lat: 36.8065, lng: 10.1815, localName: "" },
  { name: "Algiers", lat: 36.7372, lng: 3.0865, localName: "" },
  { name: "Kinshasa", lat: -4.4419, lng: 15.2663, localName: "" },
  { name: "Dakar", lat: 14.7167, lng: -17.4677, localName: "" },
  { name: "Abuja", lat: 9.0765, lng: 7.3986, localName: "" },
  // Americas
  { name: "New York", lat: 40.7128, lng: -74.006, localName: "" },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, localName: "" },
  { name: "Chicago", lat: 41.8781, lng: -87.6298, localName: "" },
  { name: "Houston", lat: 29.7604, lng: -95.3698, localName: "" },
  { name: "Phoenix", lat: 33.4484, lng: -112.074, localName: "" },
  { name: "Philadelphia", lat: 39.9526, lng: -75.1652, localName: "" },
  { name: "San Antonio", lat: 29.4241, lng: -98.4936, localName: "" },
  { name: "San Diego", lat: 32.7157, lng: -117.1611, localName: "" },
  { name: "Dallas", lat: 32.7767, lng: -96.797, localName: "" },
  { name: "San Jose", lat: 37.3382, lng: -121.8863, localName: "" },
  { name: "Miami", lat: 25.7617, lng: -80.1918, localName: "" },
  { name: "Seattle", lat: 47.6062, lng: -122.3321, localName: "" },
  { name: "Denver", lat: 39.7392, lng: -104.9903, localName: "" },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398, localName: "" },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332, localName: "" },
  { name: "Toronto", lat: 43.6532, lng: -79.3832, localName: "" },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207, localName: "" },
  { name: "Montreal", lat: 45.5017, lng: -73.5673, localName: "" },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333, localName: "" },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, localName: "" },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, localName: "" },
  { name: "Lima", lat: -12.0464, lng: -77.0428, localName: "" },
  { name: "Bogotá", lat: 4.711, lng: -74.0721, localName: "" },
  { name: "Santiago", lat: -33.4489, lng: -70.6693, localName: "" },
  { name: "Caracas", lat: 10.4806, lng: -66.9036, localName: "" },
  { name: "Havana", lat: 23.1136, lng: -82.3666, localName: "" },
  // Oceania
  { name: "Sydney", lat: -33.8688, lng: 151.2093, localName: "" },
  { name: "Melbourne", lat: -37.8136, lng: 144.9631, localName: "" },
  { name: "Brisbane", lat: -27.4698, lng: 153.0251, localName: "" },
  { name: "Perth", lat: -31.9505, lng: 115.8605, localName: "" },
  { name: "Auckland", lat: -36.8485, lng: 174.7633, localName: "" },
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

function UserLocationPin({
  lat,
  lng,
  zoom,
}: { lat: number; lng: number; zoom: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = latLngToVec3(lat, lng, 1.025);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const s = 1 + 0.4 * Math.abs(Math.sin(clock.getElapsedTime() * 2));
      ringRef.current.scale.set(s, s, s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.6 - 0.5 * Math.abs(Math.sin(clock.getElapsedTime() * 2));
    }
  });

  return (
    <group position={pos}>
      {/* Core blue dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshBasicMaterial color="#4FC3F7" />
      </mesh>
      {/* White outline */}
      <mesh>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>
      {/* Pulsing ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.018, 0.025, 32]} />
        <meshBasicMaterial
          color="#4FC3F7"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Label */}
      <Html center position={[0, 0.03, 0]}>
        <div
          style={{
            background: "rgba(79,195,247,0.9)",
            color: "#fff",
            fontSize: zoom > 2.0 ? "4px" : "3px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            padding: "1px 4px",
            borderRadius: "3px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "0 0 4px rgba(0,0,0,0.5)",
          }}
        >
          📍 You are here
        </div>
      </Html>
    </group>
  );
}

interface PinProps {
  monument: Monument;
  onHover: (m: Monument | null) => void;
  onClick: (m: Monument) => void;
  isSelected: boolean;
}

function getCategoryStyle(category: string): {
  color: string;
  geometry: string;
  args: number[];
} {
  const cat = category.toLowerCase();
  if (cat === "river")
    return {
      color: "#00BFFF",
      geometry: "cylinder",
      args: [0.007, 0.007, 0.002, 8],
    };
  if (cat === "waterfall")
    return { color: "#87CEEB", geometry: "sphere", args: [0.006, 8, 8] };
  if (cat === "mountain peak")
    return { color: "#FFFFFF", geometry: "cone", args: [0.005, 0.012, 6] };
  if (cat === "mountain range")
    return { color: "#C8C8C8", geometry: "sphere", args: [0.008, 8, 8] };
  if (cat === "hill")
    return { color: "#90EE90", geometry: "sphere", args: [0.006, 8, 8] };
  if (
    cat.includes("temple") ||
    cat.includes("religious") ||
    cat === "pagoda" ||
    cat === "cathedral" ||
    cat === "mosque" ||
    cat === "church"
  )
    return { color: "#FFD700", geometry: "octahedron", args: [0.007] };
  if (cat === "fort" || cat === "castle")
    return { color: "#FF4444", geometry: "box", args: [0.01, 0.01, 0.01] };
  if (cat === "statue")
    return { color: "#DA70D6", geometry: "sphere", args: [0.005, 8, 8] };
  if (cat === "viewpoint" || cat === "scenic site")
    return { color: "#FFA500", geometry: "tetrahedron", args: [0.008] };
  if (
    cat === "beach" ||
    cat === "sea" ||
    cat === "ocean" ||
    cat === "bay" ||
    cat === "coast"
  )
    return {
      color: "#40E0D0",
      geometry: "cylinder",
      args: [0.008, 0.008, 0.002, 8],
    };
  if (cat === "desert")
    return { color: "#E8A835", geometry: "torus", args: [0.009, 0.003, 8, 16] };
  if (cat === "museum")
    return {
      color: "#F5F5F0",
      geometry: "cylinder",
      args: [0.005, 0.005, 0.012, 6],
    };
  return { color: "#F4E04D", geometry: "sphere", args: [0.006, 8, 8] };
}

function MonumentPin({ monument, onHover, onClick, isSelected }: PinProps) {
  const pos = latLngToVec3(monument.latitude, monument.longitude, 1.03);
  const [hovered, setHovered] = useState(false);
  const style = getCategoryStyle(monument.category);
  const active = hovered || isSelected;
  const color = active ? "#ffffff" : style.color;
  const emissive = active ? "#ffffff" : style.color;
  const emissiveIntensity = active ? 1.5 : 0.6;

  const renderGeometry = () => {
    if (style.geometry === "cone")
      return <coneGeometry args={style.args as [number, number, number]} />;
    if (style.geometry === "box")
      return <boxGeometry args={style.args as [number, number, number]} />;
    if (style.geometry === "octahedron")
      return <octahedronGeometry args={[style.args[0]]} />;
    if (style.geometry === "tetrahedron")
      return <tetrahedronGeometry args={[style.args[0]]} />;
    if (style.geometry === "cylinder")
      return (
        <cylinderGeometry
          args={style.args as [number, number, number, number]}
        />
      );
    if (style.geometry === "torus")
      return (
        <torusGeometry args={style.args as [number, number, number, number]} />
      );
    return <sphereGeometry args={style.args as [number, number, number]} />;
  };

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
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
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
  targetZoom?: React.MutableRefObject<number>;
  onZoomChange?: (v: number) => void;
  userLocation?: { lat: number; lng: number } | null;
}

function Earth({
  monuments,
  onMonumentHover,
  onMonumentClick,
  selectedMonument,
  cameraDistance,
  rotation,
  userLocation,
}: EarthProps) {
  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(EARTH_TEXTURE);
  const gridGeom = useRef(createGridLines());
  const { camera } = useThree();
  const [zoom, setZoom] = useState(3);
  const frameCount = useRef(0);

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
    frameCount.current += 1;
    if (frameCount.current % 30 === 0) {
      setZoom(cameraDistance.current);
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
          <Html key={c.name} position={labelPos} center>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: zoom > 2.0 ? "4px" : "3px",
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
      {zoom < 2.8 &&
        STATE_LABELS.map((s) => {
          const labelPos = latLngToVec3(s.lat, s.lng, 1.06);
          return (
            <Html key={s.name} position={labelPos} center>
              <div
                style={{
                  color: "rgba(180,220,255,0.75)",
                  fontSize: zoom > 2.0 ? "4px" : "3px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.5px",
                  textShadow: "0 0 3px rgba(0,0,0,0.9)",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {s.name}
              </div>
            </Html>
          );
        })}
      {zoom < 2.0 &&
        CITY_LABELS.map((c) => {
          const labelPos = latLngToVec3(c.lat, c.lng, 1.04);
          return (
            <Html key={c.name} position={labelPos} center>
              <div
                style={{
                  textAlign: "center",
                  lineHeight: "1.3",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: zoom > 2.0 ? "4px" : "3px",
                    fontWeight: 500,
                    fontFamily: "Inter, sans-serif",
                    textShadow: "0 0 3px rgba(0,0,0,0.9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  • {c.name}
                </div>
                {c.localName && (
                  <div
                    style={{
                      color: "rgba(200,220,255,0.65)",
                      fontSize: zoom > 2.0 ? "4px" : "3px",
                      fontWeight: 400,
                      fontFamily: "serif",
                      textShadow: "0 0 3px rgba(0,0,0,0.9)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.localName}
                  </div>
                )}
              </div>
            </Html>
          );
        })}
      {userLocation && (
        <UserLocationPin
          lat={userLocation.lat}
          lng={userLocation.lng}
          zoom={zoom}
        />
      )}
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
  targetZoom,
  onZoomChange,
  userLocation,
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
        1.15,
        Math.min(10, cam.position.length() * factor),
      );
      cam.position.normalize().multiplyScalar(newDist);
      cam.updateProjectionMatrix();
      if (targetZoom) targetZoom.current = newDist;
      if (onZoomChange) onZoomChange(newDist);
    };

    let lastPinchDist = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist = Math.sqrt(dx * dx + dy * dy);
      } else if (e.touches.length === 1) {
        drag.current.dragging = true;
        drag.current.lastX = e.touches[0].clientX;
        drag.current.lastY = e.touches[0].clientY;
        drag.current.velX = 0;
        drag.current.velY = 0;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastPinchDist > 0) {
          const factor = lastPinchDist / dist;
          const cam = camera as THREE.PerspectiveCamera;
          const newDist = Math.max(
            1.15,
            Math.min(10, cam.position.length() * factor),
          );
          cam.position.normalize().multiplyScalar(newDist);
          cam.updateProjectionMatrix();
          if (targetZoom) targetZoom.current = newDist;
          if (onZoomChange) onZoomChange(newDist);
        }
        lastPinchDist = dist;
      } else if (e.touches.length === 1 && drag.current.dragging) {
        const dx = e.touches[0].clientX - drag.current.lastX;
        const dy = e.touches[0].clientY - drag.current.lastY;
        drag.current.rotY += dx * 0.005;
        drag.current.rotX += dy * 0.005;
        drag.current.rotX = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, drag.current.rotX),
        );
        drag.current.velX = dx * 0.005;
        drag.current.velY = dy * 0.005;
        drag.current.lastX = e.touches[0].clientX;
        drag.current.lastY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      drag.current.dragging = false;
      lastPinchDist = 0;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [camera, gl, targetZoom, onZoomChange]);

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
    const cam = camera as THREE.PerspectiveCamera;
    cameraDistance.current = cam.position.length();

    // Lerp camera toward targetZoom
    if (targetZoom) {
      const dist = cam.position.length();
      const t = targetZoom.current;
      if (Math.abs(dist - t) > 0.001) {
        cam.position.normalize().multiplyScalar(dist + (t - dist) * 0.1);
        cam.updateProjectionMatrix();
      }
    }
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
        userLocation={userLocation}
      />
    </group>
  );
}

interface Globe3DProps {
  monuments: Monument[];
  onMonumentClick: (m: Monument) => void;
  selectedMonument: Monument | null;
  onCoordsChange?: (lat: number, lng: number) => void;
  userLocation?: { lat: number; lng: number } | null;
}

const LEGEND_ITEMS = [
  { color: "#00BFFF", shape: "circle", label: "River" },
  { color: "#87CEEB", shape: "circle", label: "Waterfall" },
  { color: "#FFFFFF", shape: "triangle", label: "Mountain Peak" },
  { color: "#C8C8C8", shape: "circle", label: "Mountain Range" },
  { color: "#90EE90", shape: "circle", label: "Hill" },
  { color: "#FFD700", shape: "diamond", label: "Temple / Religious" },
  { color: "#FF4444", shape: "square", label: "Fort / Castle" },
  { color: "#DA70D6", shape: "circle", label: "Statue" },
  { color: "#FFA500", shape: "triangle", label: "Viewpoint" },
  { color: "#40E0D0", shape: "circle", label: "Beach / Sea / Ocean" },
  { color: "#F4E04D", shape: "circle", label: "Monument / Historic Site" },
  { color: "#E8A835", shape: "ring", label: "Desert" },
  { color: "#F5F5F0", shape: "pillar", label: "Museum" },
];

function MapLegend() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        bottom: "80px",
        left: "16px",
        background: "rgba(10,20,35,0.88)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
        borderRadius: "8px",
        padding: "8px 10px",
        zIndex: 40,
        minWidth: "160px",
        maxWidth: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.05em",
          }}
        >
          Map Legend
        </span>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            background: "none",
            border: "none",
            color: "#aaa",
            cursor: "pointer",
            fontSize: "10px",
            padding: "0 2px",
          }}
        >
          {expanded ? "▲" : "▼"}
        </button>
      </div>
      {expanded && (
        <div
          style={{
            marginTop: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {LEGEND_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <LegendSymbol color={item.color} shape={item.shape} />
              <span style={{ color: "#ccc", fontSize: "10px" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LegendSymbol({ color, shape }: { color: string; shape: string }) {
  const base: React.CSSProperties = {
    width: "10px",
    height: "10px",
    flexShrink: 0,
    background: color,
  };
  if (shape === "circle")
    return <div style={{ ...base, borderRadius: "50%" }} />;
  if (shape === "square") return <div style={{ ...base }} />;
  if (shape === "diamond")
    return (
      <div
        style={{
          ...base,
          transform: "rotate(45deg)",
          width: "8px",
          height: "8px",
        }}
      />
    );
  if (shape === "triangle")
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: `9px solid ${color}`,
          flexShrink: 0,
        }}
      />
    );
  if (shape === "ring")
    return (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          border: `2px solid ${color}`,
          background: "transparent",
          flexShrink: 0,
        }}
      />
    );
  if (shape === "pillar")
    return (
      <div
        style={{
          width: "6px",
          height: "12px",
          background: color,
          borderRadius: "2px",
          flexShrink: 0,
        }}
      />
    );
  return <div style={{ ...base, borderRadius: "50%" }} />;
}

// Vertical zoom slider overlay
function ZoomSlider({
  sliderZoom,
  targetZoom,
  setSliderZoom,
}: {
  sliderZoom: number;
  targetZoom: React.MutableRefObject<number>;
  setSliderZoom: (v: number) => void;
}) {
  const MIN = 1.15;
  const MAX = 10;
  const STEP = 0.05;

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    // slider value is inverted: slider max = zoomed in (small dist)
    const invertedVal = MAX + MIN - Number(e.target.value);
    targetZoom.current = invertedVal;
    setSliderZoom(invertedVal);
  };

  // Invert for display: top = zoomed in = small distance
  const sliderValue = MAX + MIN - sliderZoom;

  return (
    <div
      data-ocid="globe.zoom_slider"
      style={{
        position: "absolute",
        left: "16px",
        top: "62px",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        background: "rgba(10,20,35,0.82)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "10px 8px",
        userSelect: "none",
      }}
    >
      {/* Vertical slider via CSS rotation */}
      <div
        style={{
          width: "28px",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={sliderValue}
          onChange={handleSlider}
          style={{
            width: "120px",
            height: "4px",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            cursor: "pointer",
            accentColor: "#4a9eff",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}

export function Globe3D({
  monuments,
  onMonumentClick,
  selectedMonument,
  onCoordsChange,
  userLocation,
}: Globe3DProps) {
  const [hoveredMonument, setHoveredMonument] = useState<Monument | null>(null);
  const cameraDistance = useRef(2.5);
  const rotation = useRef({ x: 0.3, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const targetZoom = useRef<number>(2.5);
  const [sliderZoom, setSliderZoom] = useState(2.5);

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
            targetZoom={targetZoom}
            onZoomChange={setSliderZoom}
            userLocation={userLocation}
          />
        </Suspense>
      </Canvas>
      <MapLegend />
      <ZoomSlider
        sliderZoom={sliderZoom}
        targetZoom={targetZoom}
        setSliderZoom={setSliderZoom}
      />
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
