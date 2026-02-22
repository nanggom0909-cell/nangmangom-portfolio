import { Mail, Instagram, X } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-surface/90 border border-neutral-800 shadow-2xl rounded-2xl p-8 z-50 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-foreground-secondary hover:text-foreground transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="w-16 h-16 bg-accent rounded-full mb-6 flex items-center justify-center shadow-lg">
                    <Mail size={32} className="text-background" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h3>
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
        </>
    );
}
