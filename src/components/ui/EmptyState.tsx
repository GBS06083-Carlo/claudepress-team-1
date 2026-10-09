import type { EmptyStateProps } from "@/contracts/blog";

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="mt-2 text-zinc-500">{description}</p>}
    </div>
  );
}
