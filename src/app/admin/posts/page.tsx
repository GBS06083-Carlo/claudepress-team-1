import Link from "next/link";
import {
  API_ROUTES,
  POST_STATUSES,
  ROUTES,
  apiUrl,
  type Post,
  type PostStatus,
} from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeletePostButton } from "@/app/admin/posts/_list/DeletePostButton";
import { StatusToggle } from "@/app/admin/posts/_list/StatusToggle";

const dateFormat = new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" });

const FILTERS: { label: string; status?: PostStatus }[] = [
  { label: "Tutti" },
  { label: "Bozze", status: "draft" },
  { label: "Pubblicati", status: "published" },
];

function parseStatus(value: string | string[] | undefined): PostStatus | undefined {
  return POST_STATUSES.find((status) => status === value);
}

async function loadPosts(): Promise<Post[] | null> {
  const res = await fetch(apiUrl(API_ROUTES.posts), { cache: "no-store" }).catch(() => null);
  if (!res?.ok) return null;
  const posts: Post[] = await res.json();
  // Ordinamento per data di modifica, dalla più recente.
  return posts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const activeStatus = parseStatus((await searchParams).status);
  const allPosts = await loadPosts();
  const posts = activeStatus ? allPosts?.filter((p) => p.status === activeStatus) : allPosts;

  if (!posts) {
    return (
      <EmptyState
        title="Impossibile caricare i post"
        description="Il server non ha risposto come previsto. Riprova fra qualche istante."
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink">Post</h1>
        <Link
          href={ROUTES.adminPostNew}
          className="inline-flex min-h-10 items-center rounded bg-accent px-5 text-[0.9375rem] font-semibold text-on-accent transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Nuovo post
        </Link>
      </div>

      <nav aria-label="Filtra per stato" className="mb-6 flex gap-5 border-b border-rule">
        {FILTERS.map(({ label, status }) => {
          const active = status === activeStatus;
          return (
            <Link
              key={label}
              href={status ? `${ROUTES.adminPosts}?status=${status}` : ROUTES.adminPosts}
              aria-current={active ? "page" : undefined}
              className={`-mb-px border-b-2 pb-2 text-[0.9375rem] font-semibold ${
                active
                  ? "border-accent text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {posts.length === 0 ? (
        <EmptyState
          title="Nessun post"
          description={
            activeStatus
              ? "Nessun post corrisponde a questo filtro."
              : "Non c'è ancora niente da mostrare. Crea il primo post con «Nuovo post»."
          }
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rule text-sm text-muted">
                <th scope="col" className="py-2 pr-4 font-semibold">Titolo</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Autore</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Modificato</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Stato</th>
                <th scope="col" className="py-2 font-semibold">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-rule">
                  <td className="py-3 pr-4 font-semibold text-ink">{post.title}</td>
                  <td className="py-3 pr-4 text-muted">{post.author}</td>
                  <td className="py-3 pr-4 text-muted">
                    <time dateTime={post.updatedAt}>
                      {dateFormat.format(new Date(post.updatedAt))}
                    </time>
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={ROUTES.adminPost(post.id)}
                        className="font-semibold text-accent underline-offset-4 hover:underline"
                      >
                        Modifica
                      </Link>
                      <StatusToggle id={post.id} status={post.status} />
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
