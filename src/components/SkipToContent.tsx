import { cn } from "@/lib/utils";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]",
        "focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground",
        "focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      )}
    >
      Skip to Main Content
    </a>
  );
}
