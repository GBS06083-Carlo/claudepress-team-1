import { API_ROUTES, ROUTES, apiUrl, type Post } from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";
import { PostCard } from "@/components/ui/PostCard";

async function loadPublishedPosts(): Promise<Post[] | null> {
  try {
    const res = await fetch(apiUrl(API_ROUTES.publishedPosts), { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Post[];
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const posts = await loadPublishedPosts();

  if (posts === null) {
    return (
      <EmptyState
        title="Impossibile caricare i post"
        description="Qualcosa è andato storto. Riprova tra qualche istante."
      />
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="Ancora nessun post"
        description="Non c'è niente da leggere per ora: torna a trovarci presto."
      />
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
          date={post.createdAt}
          href={ROUTES.post(post.slug)}
        />
      ))}
    </div>
  );
}
