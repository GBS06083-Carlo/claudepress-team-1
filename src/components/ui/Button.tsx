import type { ButtonProps } from "@/contracts/blog";

const VARIANT_STYLES = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  secondary: "border border-rule bg-surface text-ink hover:border-muted",
  danger: "bg-danger text-on-accent hover:bg-danger-strong",
} as const;

export function Button({
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center rounded px-5 text-[0.9375rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-45 ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </button>
  );
}
