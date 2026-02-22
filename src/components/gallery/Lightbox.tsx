"use client";

import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { MediaItem } from "@/types/media";
import { useEffect, useState } from "react";

interface LightboxProps {
    item: MediaItem | null;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
}

export default function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // 최소 마우스/터치 드래그 거리 (이상이면 스와이프 로 인식)
    const minSwipeDistance = 50;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!item) return;
            if (e.key === 'ArrowRight' && onNext) onNext();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [item, onNext, onPrev, onClose]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // 터치 종료 지점 초기화
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && onNext) {
            onNext();
        }
        if (isRightSwipe && onPrev) {
            onPrev();
        }
    };

    if (!item) return null;

    const isVideo = item.type === "Video";
    const srcUrl = item.url || item.thumbnail_url || `https://picsum.photos/seed/${item.id}/1200/1600`;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-surface/50 text-foreground hover:bg-neutral-500/20 transition-colors z-10 pointer-events-auto"
            >
                <X size={24} />
            </button>

            {onPrev && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/30 text-foreground hover:bg-surface/80 transition-colors z-10 pointer-events-auto"
                >
                    <ChevronLeft size={32} />
                </button>
            )}
            {onNext && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/30 text-foreground hover:bg-surface/80 transition-colors z-10 pointer-events-auto"
                >
                    <ChevronRight size={32} />
                </button>
            )}

            <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center pointer-events-none">
                {/* Media Container */}
                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center rounded-lg overflow-hidden shrink-0 pointer-events-auto">
                    {isVideo ? (
                        <div className="relative w-full aspect-video bg-surface rounded-lg flex items-center justify-center border border-neutral-800">
                            {/* Fallback mock for video since we might not have real URLs yet */}
                            <div className="text-center">
                                <Play size={48} className="mx-auto text-foreground-secondary mb-4" />
                                <p className="text-foreground-secondary">비디오 플레어어 지원 준비 중</p>
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
                    <div className="inline-block px-3 py-1 bg-surface rounded-md text-xs font-medium text-foreground-secondary mb-3 border border-neutral-800">
                        {item.type}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{item.title}</h2>
                    {item.description && (
                        <p className="text-foreground-secondary text-sm sm:text-base max-w-2xl mx-auto">
                            {item.description}
                        </p>
                    )}
                    <p className="text-foreground-secondary opacity-60 text-xs mt-4">
                        업로드: {item.created_at}
                    </p>
                </div>
            </div>
        </div>
    );
}
