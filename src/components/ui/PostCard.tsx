import Link from "next/link";
import type { PostCardProps } from "@/contracts/blog";

const dateFormatter = new Intl.DateTimeFormat("it-IT", { dateStyle: "long" });

export function PostCard({ title, excerpt, author, date, href }: PostCardProps) {
  return (
    <article className="border-t border-rule pt-6 pb-2">
      <p className="text-sm font-semibold text-muted tabular-nums">
        <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
      </p>
      <h2 className="mt-1 text-[1.75rem] leading-[1.1] font-bold tracking-tight text-balance text-ink sm:text-[2.25rem]">
        <Link
          href={href}
          className="decoration-accent decoration-2 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {title}
        </Link>
      </h2>
      {excerpt && (
        <p className="mt-3 max-w-prose font-serif text-lg leading-relaxed text-ink/85">
          {excerpt}
        </p>
      )}
      <p className="mt-3 text-sm text-muted">di {author}</p>
    </article>
  );
}
