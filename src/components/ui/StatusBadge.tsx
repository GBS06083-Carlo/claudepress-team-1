import type { PostStatus, StatusBadgeProps } from "@/contracts/blog";

const STATUS_STYLES: Record<PostStatus, { label: string; className: string }> = {
  draft: {
    label: "Bozza",
    className: "bg-amber-100 text-amber-800",
  },
  published: {
    label: "Pubblicato",
    className: "bg-green-100 text-green-800",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = STATUS_STYLES[status];

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
