export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 mt-12 border-t border-surface/50">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
                <p className="text-sm text-foreground-secondary font-medium tracking-wide">
                    &copy; {currentYear} nangmangom. All rights reserved.
                </p>
                <p className="text-xs text-foreground-secondary/60">
                    Photography and Video Portfolio
                </p>
            </div>
        </footer>
    );
}
