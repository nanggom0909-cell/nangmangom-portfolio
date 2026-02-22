"use client";

import Link from 'next/link';
import { User, Mail } from 'lucide-react';
import { useState } from 'react';
import ContactModal from './ContactModal';

export default function Header() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
                    nangmangom
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="text-foreground-secondary hover:text-foreground text-sm font-medium transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-surface"
                    >
                        <Mail size={16} />
                        <span className="hidden sm:inline">Contact</span>
                    </button>

                    <Link
                        href="/admin"
                        className="text-foreground-secondary opacity-40 hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-surface"
                        aria-label="Admin Login"
                    >
                        <User size={20} />
                    </Link>
                </div>
            </div>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </header>
    );
}
