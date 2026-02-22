"use client";

import { MediaItem } from "@/types/media";
import MediaCard from "./MediaCard";

interface MasonryGridProps {
    items: MediaItem[];
    isLoading?: boolean;
    onMediaClick?: (item: MediaItem) => void;
}

export default function MasonryGrid({ items, isLoading = false, onMediaClick }: MasonryGridProps) {
    if (isLoading) {
        return (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`skeleton-${i}`}
                        className="w-full bg-surface animate-pulse rounded-xl break-inside-avoid"
                        style={{ height: `${250 + (i % 3) * 100}px`, marginBottom: '1.5rem' }}
                    />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-32 text-center text-foreground-secondary">
                <svg
                    className="w-16 h-16 mb-6 opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <h3 className="text-xl font-medium text-foreground">아직 게시된 작업물이 없습니다.</h3>
                <p className="mt-2 text-sm opacity-60">관리자 페이지에서 미디어를 업로드해주세요.</p>
            </div>
        );
    }

    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 w-full pb-20">
            {items.map((item) => (
                <MediaCard key={item.id} item={item} onClick={onMediaClick} />
            ))}
        </div>
    );
}
