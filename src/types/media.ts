export type MediaType = 'Photo' | 'Portrait' | 'Landscape' | 'Snap' | 'Video';

export interface MediaItem {
    id: string;
    title: string;
    type: MediaType;
    url: string;
    thumbnail_url?: string;
    description?: string;
    created_at: string;
}
