import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Monument } from "../types";

interface SearchBarProps {
  monuments: Monument[];
  onSelect: (m: Monument) => void;
}

export function SearchBar({ monuments, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length > 0
      ? monuments
          .filter((m) => {
            const q = query.toLowerCase();
            return (
              m.name.toLowerCase().includes(q) ||
              m.city.toLowerCase().includes(q) ||
              m.country.toLowerCase().includes(q)
            );
          })
          .slice(0, 8)
      : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = (m: Monument) => {
    setQuery("");
    setFocused(false);
    onSelect(m);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg"
      data-ocid="search.panel"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 glass-panel rounded-full border border-white/10">
        <Search size={16} className="shrink-0" style={{ color: "#A9B6C9" }} />
        <input
          type="text"
          placeholder="Search monuments, cities, countries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
          style={{ color: "#EAF0F8" }}
          data-ocid="search.input"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="shrink-0 hover:text-white transition-colors"
            style={{ color: "#A9B6C9" }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {focused && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-xl overflow-hidden z-50"
          style={{ border: "1px solid rgba(42,58,85,0.9)" }}
        >
          {results.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => handleSelect(m)}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
              data-ocid={`search.item.${m.id}`}
            >
              <div
                className="w-10 h-10 rounded-lg shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${m.imageUrl})` }}
              />
              <div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "#EAF0F8" }}
                >
                  {m.name}
                </div>
                <div className="text-xs" style={{ color: "#A9B6C9" }}>
                  {m.city}, {m.country}
                </div>
              </div>
              <div
                className="ml-auto text-xs px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: "rgba(244,178,60,0.15)",
                  color: "#F4B23C",
                }}
              >
                {m.category}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
