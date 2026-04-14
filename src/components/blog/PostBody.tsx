import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";

interface PostBodyProps {
  content: string;
  className?: string;
}

export function PostBody({ content, className }: PostBodyProps) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none [&>:first-child]:mt-4",
        "prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight",
        "prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:leading-tight",
        "prose-p:text-foreground/70 prose-p:leading-relaxed prose-p:text-lg md:prose-p:text-xl",
        "prose-a:text-accent prose-a:font-bold prose-a:no-underline hover:prose-a:text-accent/90 transition-colors",
        "prose-img:rounded-2xl md:prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-12 prose-img:w-full prose-img:object-cover border-4 border-secondary/30",
        "prose-blockquote:border-l-8 prose-blockquote:border-l-accent prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:my-12 prose-blockquote:bg-secondary/30 prose-blockquote:rounded-r-2xl prose-blockquote:text-foreground prose-blockquote:italic prose-blockquote:font-bold prose-blockquote:text-xl md:prose-blockquote:text-2xl",
        "prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-sm prose-code:font-bold prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-primary prose-pre:text-primary-foreground prose-pre:rounded-2xl prose-pre:p-8 prose-pre:shadow-xl",
        "prose-ul:text-foreground/70 prose-ol:text-foreground/70 prose-ul:space-y-3 prose-ol:space-y-3",
        "prose-strong:text-foreground prose-strong:font-black",
        "prose-hr:border-border/50 prose-hr:my-16",
        "prose-li:leading-relaxed prose-li:text-lg md:prose-li:text-xl",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
