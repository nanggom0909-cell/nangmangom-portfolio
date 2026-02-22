"use client";

import { X, Play } from "lucide-react";
import Image from "next/image";
import { MediaItem } from "@/types/media";

interface LightboxProps {
    item: MediaItem | null;
    onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
    if (!item) return null;

    const isVideo = item.type === "Video";
    const srcUrl = item.url || item.thumbnail_url || `https://picsum.photos/seed/${item.id}/1200/1600`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
                <X size={24} />
            </button>

            <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">
                {/* Media Container */}
                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center rounded-lg overflow-hidden shrink-0">
                    {isVideo ? (
                        <div className="relative w-full aspect-video bg-neutral-900 rounded-lg flex items-center justify-center border border-neutral-800">
                            {/* Fallback mock for video since we might not have real URLs yet */}
                            <div className="text-center">
                                <Play size={48} className="mx-auto text-neutral-500 mb-4" />
                                <p className="text-neutral-400">비디오 플레이어 미리보기</p>
                            </div>
                        </div>
                    ) : (
                        <Image
                            src={srcUrl}
                            alt={item.title}
                            width={1600}
                            height={1600}
                            className="object-contain max-h-[80vh] w-auto h-auto rounded-lg shadow-2xl"
                            sizes="100vw"
                            priority
                        />
                    )}
                </div>

                {/* Info Container */}
                <div className="mt-6 text-center shrink-0">
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-md text-xs font-medium text-neutral-300 mb-3">
                        {item.type}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{item.title}</h2>
                    {item.description && (
                        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
                            {item.description}
                        </p>
                    )}
                    <p className="text-neutral-500 text-xs mt-4">
                        업로드: {item.created_at}
                    </p>
                </div>
            </div>
        </div>
    );
}
