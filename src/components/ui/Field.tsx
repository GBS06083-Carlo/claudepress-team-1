import type { FieldProps } from "@/contracts/blog";

export function Field({ label, htmlFor, error, children }: FieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.9375rem] font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
