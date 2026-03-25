export interface Monument {
  id: number;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  category: string;
  description: string;
  history: string;
  imageUrl: string;
}

export type ViewMode = "globe" | "map" | "satellite";

export type TransportMode = "CAR" | "BUS" | "TRAIN" | "FLIGHT" | "MOTORCYCLE";

export interface RouteInfo {
  monument: Monument;
  userLat: number;
  userLng: number;
  transportMode: TransportMode;
  distanceKm: number;
  estimatedHours: number;
}
