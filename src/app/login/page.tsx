"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // **[DEV MODE BYPASS]** Mock successful login since Supabase is not connected yet
            if (process.env.NODE_ENV === "development") {
                toast.success("개발 모드: 임시 관리자 계정으로 접속합니다!");
                router.push("/admin");
                return;
            }

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                toast.error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
                setLoading(false);
                return;
            }

            toast.success("로그인 성공!");

            // Refresh router to apply middleware redirects
            router.refresh();
            router.push("/admin");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message || "알 수 없는 오류가 발생했습니다.");
            } else {
                toast.error("알 수 없는 오류가 발생했습니다.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full p-8 rounded-2xl bg-surface border border-neutral-800 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Login</h1>
                    <p className="text-sm text-foreground-secondary mt-2">
                        nangmangom 포트폴리오 관리자 전용
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-background border border-neutral-800 text-foreground placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="nangmangom@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-background border border-neutral-800 text-foreground placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 rounded-lg bg-foreground text-background font-bold hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground focus:ring-offset-background transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
                    </button>
                </form>

                {/* Back to Home link */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                    >
                        &larr; 갤러리로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}
