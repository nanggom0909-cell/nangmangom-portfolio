"use client";

import { MediaItem } from "@/types/media";
import { Trash2, Image as ImageIcon, Video, Calendar } from "lucide-react";
import Image from "next/image";

interface MediaListRowProps {
    item: MediaItem;
    onDeleteRequest: (id: string) => void;
}

export default function MediaListRow({ item, onDeleteRequest }: MediaListRowProps) {
    const isVideo = item.type === "Video";
    // Fallback to picsum
    const srcUrl = item.thumbnail_url || item.url || `https://picsum.photos/seed/${item.id}/200/200`;

    return (
        <div className="flex items-center justify-between p-4 bg-background border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors group">
            <div className="flex items-center gap-4 cursor-pointer">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-neutral-800">
                    <Image
                        src={srcUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                    />
                </div>

                <div className="flex flex-col">
                    <h4 className="text-foreground font-semibold leading-tight mb-1">{item.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-foreground-secondary font-medium">
                        <span className="flex items-center gap-1 bg-surface py-0.5 px-2 rounded-md">
                            {isVideo ? <Video size={12} /> : <ImageIcon size={12} />}
                            {item.type}
                        </span>
                        <span className="flex items-center gap-1 opacity-70">
                            <Calendar size={12} />
                            {item.created_at}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onDeleteRequest(item.id)}
                    className="p-2 text-foreground-secondary hover:text-error hover:bg-red-500/10 rounded-lg transition-all"
                    title="삭제"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
