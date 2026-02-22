"use client";

import { useState, useMemo } from "react";
import Header from "@/components/ui/Header";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/types/media";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

const CATEGORIES = ["All", "Portrait", "Landscape", "Snap", "Video"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("media")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
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
