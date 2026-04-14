import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, type BlogCategory } from "@/types/blog";

interface CategoryFilterProps {
  active: BlogCategory;
  onChange: (cat: BlogCategory) => void;
  counts?: Record<string, number>;
}

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-border pb-6">
      {BLOG_CATEGORIES.map((cat) => {
        const count = cat !== "All" && counts ? counts[cat] : undefined;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={cn(
              "relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer border-2 border-accent bg-primary text-primary-foreground",
              active === cat
                ? "shadow-md ring-2 ring-accent ring-offset-2 ring-offset-background"
                : "opacity-80 hover:opacity-100"
            )}
          >
            {cat}
            {count !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black leading-none bg-accent-gradient text-accent-foreground"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
