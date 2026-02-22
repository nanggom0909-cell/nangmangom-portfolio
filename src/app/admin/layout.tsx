"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast, Toaster } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success("로그아웃 되었습니다.");
        router.refresh();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="sticky top-0 z-40 bg-surface border-b border-neutral-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-bold text-foreground tracking-tight">Admin Panel</h1>
                        <Link
                            href="/"
                            className="text-sm text-foreground-secondary hover:text-foreground flex items-center gap-2 transition-colors"
                        >
                            <ArrowLeft size={16} /> 갤러리로 돌아가기
                        </Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-red-400 transition-colors"
                    >
                        <LogOut size={16} /> 로그아웃
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>

            <Toaster position="bottom-right" theme="dark" richColors />
        </div>
    );
}
