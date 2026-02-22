"use client";

import { useState } from "react";
import { UploadCloud, File, AlertCircle, X, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { MediaType } from "@/types/media";

interface UploadDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function UploadDrawer({ isOpen, onClose, onSuccess }: UploadDrawerProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<MediaType>("Photo");
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'video/mp4': [],
        },
        maxSize: 50 * 1024 * 1024, // 50MB
        maxFiles: 1,
        onDropAccepted: (files) => {
            setFile(files[0]);
            setErrorText("");
            // Auto-set type based on file
            if (files[0].type.startsWith("video/")) setType("Video");
            else setType("Photo");
        },
        onDropRejected: (fileRejections) => {
            setFile(null);
            const error = fileRejections[0].errors[0];
            if (error.code === "file-too-large") {
                setErrorText("파일 용량이 너무 큽니다. (최대 50MB)");
                toast.error("50MB 이상의 파일은 업로드할 수 없습니다.");
            } else {
                setErrorText("지원하지 않는 파일 형식입니다. (JPG, PNG, MP4 가능)");
                toast.error("지원하지 않는 파일 형식입니다.");
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            toast.error("업로드할 파일을 선택해주세요.");
            return;
        }

        setIsUploading(true);

        try {
            // Mock Supabase Upload logic
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success("업로드가 완료되었습니다!");

            // Reset form
            setTitle("");
            setDescription("");
            setFile(null);
            setErrorText("");

            setIsUploading(false);
            onSuccess();
        } catch {
            toast.error("업로드 중 오류가 발생했습니다.");
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-surface z-50 shadow-2xl overflow-y-auto border-l border-neutral-800 flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
                <div className="flex items-center justify-between p-6 border-b border-neutral-800 sticky top-0 bg-surface/80 backdrop-blur z-10">
                    <h2 className="text-xl font-bold text-foreground tracking-tight">새 미디어 업로드</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-neutral-800 text-foreground-secondary hover:text-foreground transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col gap-6">
                    {/* Dropzone */}
                    <div>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 h-48
                ${isDragActive ? "border-accent bg-accent/5" : "border-neutral-700 bg-background/50"}
                ${(errorText || isDragReject) ? "border-error bg-error/5 text-error" : "hover:border-neutral-500"}
              `}
                        >
                            <input {...getInputProps()} />
                            {file ? (
                                <div className="flex flex-col items-center text-foreground">
                                    <div className="p-3 bg-surface rounded-full mb-3 shadow-md border border-neutral-700">
                                        <File size={28} className="text-accent" />
                                    </div>
                                    <p className="font-medium text-sm max-w-xs truncate">{file.name}</p>
                                    <p className="text-xs text-foreground-secondary mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud size={36} className={`mb-4 ${errorText || isDragReject ? 'text-error' : 'text-neutral-500'}`} />
                                    <p className="font-medium text-sm mb-1">여기로 파일을 드래그하거나 클릭하여 선택하세요</p>
                                    <p className="text-xs opacity-60">JPG, PNG, MP4 지원 (최대 50MB)</p>
                                </>
                            )}
                        </div>
                        {errorText && (
                            <p className="flex items-center gap-1.5 mt-2 text-xs font-medium text-error">
                                <AlertCircle size={14} /> {errorText}
                            </p>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground-secondary mb-1.5">제목 (Title)</label>
                            <input
                                required
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full px-4 py-2.5 bg-background border border-neutral-800 rounded-lg text-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                placeholder="멋진 작품의 제목을 입력하세요"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground-secondary mb-1.5">카테고리</label>
                            <select
                                title="카테고리 선택"
                                value={type}
                                onChange={e => setType(e.target.value as MediaType)}
                                className="w-full px-4 py-2.5 bg-background border border-neutral-800 rounded-lg text-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none"
                            >
                                <option value="Photo">사진 (일반 Photo)</option>
                                <option value="Portrait">사진 (인물 Portrait)</option>
                                <option value="Landscape">사진 (풍경 Landscape)</option>
                                <option value="Snap">사진 (스냅 Snap)</option>
                                <option value="Video">영상 (Video)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground-secondary mb-1.5">설명 (선택)</label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2.5 bg-background border border-neutral-800 rounded-lg text-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                                placeholder="작품에 대한 간단한 설명을 추가해보세요"
                            />
                        </div>
                    </div>

                    <div className="mt-auto pt-6 pb-2">
                        <button
                            type="submit"
                            disabled={isUploading || !file}
                            className="w-full py-3.5 bg-foreground text-background font-bold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    업로드 중...
                                </>
                            ) : (
                                "미디어 업로드"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
