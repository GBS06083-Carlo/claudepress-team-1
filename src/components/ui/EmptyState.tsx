import type { EmptyStateProps } from "@/contracts/blog";

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border-l-2 border-accent py-2 pl-5">
      <h2 className="text-[1.375rem] leading-tight font-semibold text-ink">{title}</h2>
      {description && (
        <p className="mt-2 max-w-prose font-serif text-lg leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
