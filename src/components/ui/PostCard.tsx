import Link from "next/link";
import type { PostCardProps } from "@/contracts/blog";

const dateFormatter = new Intl.DateTimeFormat("it-IT", { dateStyle: "long" });

export function PostCard({ title, excerpt, author, date, href }: PostCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 p-5 transition hover:shadow-md">
      <h2 className="text-xl font-semibold">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h2>
      <p className="mt-2 text-zinc-600">{excerpt}</p>
      <p className="mt-4 text-sm text-zinc-500">
        di {author} · <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
      </p>
    </article>
  );
}
