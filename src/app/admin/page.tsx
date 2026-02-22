"use client";

import { useState } from "react";
import { Plus, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { MediaItem } from "@/types/media";
import MediaListRow from "@/components/admin/MediaListRow";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import UploadDrawer from "@/components/admin/UploadDrawer";

// Mock Data
const INITIAL_MOCK_ITEMS: MediaItem[] = [
    { id: "1", title: "Neon City", type: "Photo", url: "", created_at: "2026-02-22" },
    { id: "2", title: "Ocean Waves", type: "Video", url: "", created_at: "2026-02-21" },
    { id: "3", title: "Mountain Peak", type: "Photo", url: "", created_at: "2026-02-20" },
];

export default function AdminPage() {
    const [items, setItems] = useState<MediaItem[]>(INITIAL_MOCK_ITEMS);
    const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteRequest = (id: string) => {
        setItemToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        setIsDeleting(true);

        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 800));

            setItems(prev => prev.filter(item => item.id !== itemToDelete));
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

            {items.length === 0 ? (
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
                    // In real app, we re-fetch data. Here we mock it.
                    toast.info("갤러리가 새로고침 되었습니다.");
                }}
            />
        </div>
    );
}
