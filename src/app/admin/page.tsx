"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MediaItem } from "@/types/media";
import MediaListRow from "@/components/admin/MediaListRow";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import UploadDrawer from "@/components/admin/UploadDrawer";
import { createClient } from "@/utils/supabase/client";

export default function AdminPage() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<MediaItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const supabase = createClient();

    const fetchMedia = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("media")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (err) {
            toast.error("데이터를 불러오는데 실패했습니다.");
            console.error(err);
        } finally {
            setIsLoadingInitial(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const handleDeleteRequest = (id: string) => {
        const item = items.find(i => i.id === id);
        if (item) {
            setItemToDelete(item);
            setDeleteModalOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        setIsDeleting(true);

        try {
            // Extract the Storage file path from the URL to delete from bucket
            const urlParts = itemToDelete.url.split('portfolio-media/');
            if (urlParts.length > 1) {
                const filePath = urlParts[1].split('?')[0]; // Remove query params if any
                const { error: storageError } = await supabase.storage
                    .from('portfolio-media')
                    .remove([filePath]);
                if (storageError) console.error("Storage delete error:", storageError);
            }

            // Delete from Database
            const { error: dbError } = await supabase
                .from('media')
                .delete()
                .eq('id', itemToDelete.id);

            if (dbError) throw dbError;

            setItems(prev => prev.filter(item => item.id !== itemToDelete.id));
            toast.success("미디어가 성공적으로 삭제되었습니다.");
        } catch {
            toast.error("삭제 중 오류가 발생했습니다.");
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">작업물 관리</h2>
                    <p className="text-sm text-foreground-secondary mt-1">포트폴리오에 노출될 미디어를 추가, 수정 또는 삭제하세요.</p>
                </div>

                <button
                    onClick={() => setIsUploadDrawerOpen(true)}
                    className="bg-accent text-background px-5 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg"
                >
                    <Plus size={20} strokeWidth={3} />
                    업로드
                </button>
            </div>

            {isLoadingInitial ? (
                <div className="w-full flex justify-center py-20 text-foreground-secondary">
                    <Loader2 className="animate-spin w-8 h-8" />
                </div>
            ) : items.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center py-24 text-center border border-dashed border-neutral-800 rounded-2xl bg-surface/50">
                    <ImageIcon className="w-12 h-12 text-neutral-600 mb-4" />
                    <h3 className="text-lg font-medium text-foreground">아직 업로드된 폴트폴리오가 없습니다</h3>
                    <p className="mt-1 text-sm text-foreground-secondary mb-6">새로운 작업물을 추가하여 갤러리를 채워보세요.</p>
                    <button
                        onClick={() => setIsUploadDrawerOpen(true)}
                        className="text-sm font-medium text-background bg-foreground px-4 py-2 rounded-lg"
                    >
                        첫 미디어 업로드
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {items.map(item => (
                        <MediaListRow key={item.id} item={item} onDeleteRequest={handleDeleteRequest} />
                    ))}
                </div>
            )}

            {/* Modals & Drawers */}
            <DeleteConfirmDialog
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />

            <UploadDrawer
                isOpen={isUploadDrawerOpen}
                onClose={() => setIsUploadDrawerOpen(false)}
                onSuccess={() => {
                    setIsUploadDrawerOpen(false);
                    fetchMedia();
                }}
            />
        </div>
    );
}
