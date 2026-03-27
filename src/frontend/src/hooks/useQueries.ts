import { useQuery } from "@tanstack/react-query";
import { LOCAL_MONUMENTS } from "../data/monuments";
import type { Monument } from "../types";

export function useMonuments() {
  return useQuery<Monument[]>({
    queryKey: ["monuments"],
    queryFn: async () => LOCAL_MONUMENTS,
    initialData: LOCAL_MONUMENTS,
  });
}

export function useSearchMonuments(query: string) {
  return useQuery<Monument[]>({
    queryKey: ["monuments", "search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const q = query.toLowerCase();
      return LOCAL_MONUMENTS.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.city.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q),
      );
    },
    enabled: query.trim().length > 0,
  });
}
