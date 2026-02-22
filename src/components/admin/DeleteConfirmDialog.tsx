"use client";

import { AlertCircle } from "lucide-react";

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

export default function DeleteConfirmDialog({ isOpen, onClose, onConfirm, isDeleting }: DeleteConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="bg-surface border border-neutral-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all"
                role="dialog"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                        <AlertCircle className="text-error" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">정말 삭제하시겠습니까?</h3>
                    <p className="text-sm text-foreground-secondary mb-6">
                        삭제된 미디어는 복구할 수 없습니다. 계속하시겠습니까?
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 py-2.5 rounded-lg bg-neutral-800 text-foreground text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50"
                        >
                            취소
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="flex-1 py-2.5 rounded-lg bg-error text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex justify-center items-center"
                        >
                            {isDeleting ? "삭제 중..." : "삭제"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
