import { useQuery } from "@tanstack/react-query";
import { LOCAL_MONUMENTS } from "../data/monuments";
import type { Monument } from "../types";
import { useActor } from "./useActor";

function mapBackendMonument(
  m: {
    name: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    category: string;
    description: string;
    history: string;
    imageUrl: string;
  },
  idx: number,
): Monument {
  return {
    id: idx + 1,
    name: m.name,
    city: m.city,
    country: m.country,
    latitude: m.latitude,
    longitude: m.longitude,
    category: m.category,
    description: m.description,
    history: m.history,
    imageUrl: m.imageUrl,
  };
}

export function useMonuments() {
  const { actor, isFetching } = useActor();
  return useQuery<Monument[]>({
    queryKey: ["monuments"],
    queryFn: async () => {
      if (!actor) return LOCAL_MONUMENTS;
      try {
        const data = await actor.getAllMonuments();
        if (data && data.length > 0) {
          return data.map(mapBackendMonument);
        }
        return LOCAL_MONUMENTS;
      } catch {
        return LOCAL_MONUMENTS;
      }
    },
    enabled: !isFetching,
    initialData: LOCAL_MONUMENTS,
  });
}

export function useSearchMonuments(query: string) {
  const { actor } = useActor();
  return useQuery<Monument[]>({
    queryKey: ["monuments", "search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const q = query.toLowerCase();
      if (!actor) {
        return LOCAL_MONUMENTS.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.city.toLowerCase().includes(q) ||
            m.country.toLowerCase().includes(q),
        );
      }
      try {
        const data = await actor.searchMonuments(query);
        if (data && data.length > 0) return data.map(mapBackendMonument);
        return LOCAL_MONUMENTS.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.city.toLowerCase().includes(q) ||
            m.country.toLowerCase().includes(q),
        );
      } catch {
        return LOCAL_MONUMENTS.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.city.toLowerCase().includes(q) ||
            m.country.toLowerCase().includes(q),
        );
      }
    },
    enabled: query.trim().length > 0,
  });
}
