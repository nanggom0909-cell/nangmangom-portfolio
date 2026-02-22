import { Mail, Instagram } from 'lucide-react';
import Header from '@/components/ui/Header';

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-64px)]">
                <div className="w-full max-w-sm bg-surface/50 border border-neutral-800 shadow-xl rounded-2xl p-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-16 h-16 bg-accent rounded-full mb-6 flex items-center justify-center shadow-lg">
                        <Mail size={32} className="text-background" />
                    </div>

                    <h1 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h1>
                    <p className="text-center text-sm text-foreground-secondary mb-8">
                        프로젝트 문의나 궁금한 점이 있으시다면 언제든 연락주세요.
                    </p>

                    <div className="flex flex-col gap-4 w-full">
                        <a
                            href="mailto:nanggom0909@gmail.com"
                            className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-neutral-800 hover:border-accent hover:bg-accent/5 transition-all group"
                        >
                            <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-accent group-hover:text-background transition-colors">
                                <Mail size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-foreground-secondary font-medium">Email</span>
                                <span className="text-sm font-semibold text-foreground">nanggom0909@gmail.com</span>
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/nangmangomtengi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-neutral-800 hover:border-pink-500 hover:bg-pink-500/5 transition-all group"
                        >
                            <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-500 group-hover:text-white transition-all">
                                <Instagram size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-foreground-secondary font-medium">Instagram</span>
                                <span className="text-sm font-semibold text-foreground">@nangmangomtengi</span>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
