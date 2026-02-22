"use client";

import { useState, useMemo } from "react";
import Header from "@/components/ui/Header";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/types/media";

// Mock data for initial UI dev
const MOCK_ITEMS: MediaItem[] = [
  { id: "1", title: "Neon City", type: "Photo", url: "", created_at: "2026-02-22", description: "Cyberpunk street vibes" },
  { id: "2", title: "Ocean Waves", type: "Video", url: "", created_at: "2026-02-21" },
  { id: "3", title: "Mountain Peak", type: "Landscape", url: "", created_at: "2026-02-20" },
  { id: "4", title: "Cafe Aesthetic", type: "Snap", url: "", created_at: "2026-02-19" },
  { id: "5", title: "Drone Flight", type: "Video", url: "", created_at: "2026-02-18", description: "Aerial view of the forest" },
  { id: "6", title: "Portrait Shift", type: "Portrait", url: "", created_at: "2026-02-17" },
];

const CATEGORIES = ["All", "Photo", "Portrait", "Landscape", "Snap", "Video"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items] = useState<MediaItem[]>(MOCK_ITEMS);
  const [isLoading] = useState(false); // Set to true to test skeleton
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    if (activeCategory === "Photo") {
      return items.filter(item => ["Photo", "Portrait", "Landscape", "Snap"].includes(item.type));
    }
    return items.filter(item => item.type === activeCategory);
  }, [items, activeCategory]);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative">
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <MasonryGrid items={filteredItems} isLoading={isLoading} onMediaClick={setSelectedMedia} />
      </main>

      <Lightbox item={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </>
  );
}
