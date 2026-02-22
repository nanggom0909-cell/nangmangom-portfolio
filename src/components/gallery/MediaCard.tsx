"use client";

import Image from "next/image";
import { Play, Images } from "lucide-react";
import { MediaItem } from "@/types/media";

interface MediaCardProps {
    item: MediaItem;
    onClick?: (item: MediaItem) => void;
}

export default function MediaCard({ item, onClick }: MediaCardProps) {
    const isVideo = item.type === "Video";
    // Fallback to random picsum for placeholder if no URL
    // Create varying heights for the masonry mockup based on ID
    const mockHeight = 600 + ((parseInt(item.id) || 1) * 250) % 600;
    const srcUrl = item.thumbnail_url || item.url || `https://picsum.photos/seed/${item.id}/800/${mockHeight}`;

    return (
        <div
            onClick={() => onClick && onClick(item)}
            className="relative w-full overflow-hidden rounded-xl group cursor-pointer bg-surface inline-block mb-6 break-inside-avoid-column shadow-sm hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative w-full">
                {/* Placeholder image representation using next/image */}
                <Image
                    src={srcUrl}
                    alt={item.title}
                    width={800}
                    height={mockHeight}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Video Badge */}
                {isVideo ? (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white z-10 transition-opacity group-hover:opacity-0 delay-100">
                        <Play size={16} fill="white" />
                    </div>
                ) : (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 text-white z-10 transition-opacity group-hover:opacity-0 delay-100 rounded-lg">
                        <Images size={16} />
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                    <div className="transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-medium text-white mb-3">
                            {item.type}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight">
                            {item.title}
                        </h3>
                        {item.description && (
                            <p className="text-sm text-neutral-300 mt-2 line-clamp-2">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
