import type { PostStatus, StatusBadgeProps } from "@/contracts/blog";

const STATUS_STYLES: Record<PostStatus, { label: string; className: string }> = {
  draft: {
    label: "Bozza",
    className: "text-draft",
  },
  published: {
    label: "Pubblicato",
    className: "text-accent",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${className}`}
    >
      <span aria-hidden="true" className="size-2 rounded-[1px] bg-current" />
      {label}
    </span>
  );
}
