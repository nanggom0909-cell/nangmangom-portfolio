import Link from 'next/link';
import { User } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
                    nangmangom
                </Link>
                <Link
                    href="/admin"
                    className="text-foreground-secondary opacity-40 hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-surface"
                    aria-label="Admin Login"
                >
                    <User size={20} />
                </Link>
            </div>
        </header>
    );
}
