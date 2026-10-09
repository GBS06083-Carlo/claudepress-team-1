import { notFound } from "next/navigation";
import { API_ROUTES, apiUrl, type Post } from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";

type LoadResult = { kind: "ok"; post: Post } | { kind: "not_found" } | { kind: "error" };

async function loadPost(slug: string): Promise<LoadResult> {
  try {
    const res = await fetch(apiUrl(API_ROUTES.postBySlug(slug)), { cache: "no-store" });
    if (res.status === 404) return { kind: "not_found" };
    if (!res.ok) return { kind: "error" };
    return { kind: "ok", post: (await res.json()) as Post };
  } catch {
    return { kind: "error" };
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await loadPost(slug);

  if (result.kind === "error") {
    return (
      <EmptyState
        title="Impossibile caricare il post"
        description="Qualcosa è andato storto. Riprova tra qualche istante."
      />
    );
  }

  // Le bozze non sono pubbliche: per il sito è come se non esistessero.
  if (result.kind === "not_found" || result.post.status !== "published") {
    notFound();
  }

  const { post } = result;

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl leading-tight font-semibold text-ink">{post.title}</h1>
        <p className="text-muted">
          {post.author} ·{" "}
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString("it-IT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>
      </header>
      <div className="max-w-prose font-serif text-lg leading-relaxed whitespace-pre-wrap text-ink">
        {post.content}
      </div>
    </article>
  );
}
