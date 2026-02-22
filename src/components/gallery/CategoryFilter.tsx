"use client";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="w-full overflow-x-auto hide-scrollbar py-6 mb-4">
            <div className="flex items-center justify-center gap-3 min-w-max px-4">
                {categories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                    ? "bg-accent text-background shadow-md transform scale-105"
                                    : "bg-surface/50 text-foreground-secondary hover:bg-surface hover:text-foreground"
                                }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
