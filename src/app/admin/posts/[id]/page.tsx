import { notFound } from "next/navigation";
import { API_ROUTES, apiUrl, type Post } from "@/contracts/blog";
import { PostForm } from "@/app/admin/_components/PostForm";

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]">) {
  const { id } = await params;
  const response = await fetch(apiUrl(API_ROUTES.post(id)), { cache: "no-store" });

  if (response.status === 404) notFound();
  if (!response.ok) {
    throw new Error(`Impossibile caricare il post ${id}: risposta ${response.status}`);
  }

  const post = (await response.json()) as Post;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[2.25rem] leading-[1.1] font-bold tracking-tight text-balance text-ink">
        Modifica post
      </h1>
      <PostForm
        postId={post.id}
        initialValues={{
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          status: post.status,
        }}
      />
    </div>
  );
}
