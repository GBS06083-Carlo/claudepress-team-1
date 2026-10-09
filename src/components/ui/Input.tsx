"use client";
// Client component: l'onChange del contratto riceve il valore e va collegato a un event handler.

import type { InputProps } from "@/contracts/blog";

export function Input({
  id,
  name,
  value,
  onChange,
  multiline,
  placeholder,
  invalid,
}: InputProps) {
  const className = `w-full rounded border bg-surface px-3 py-2.5 text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 ${
    invalid
      ? "border-danger focus:ring-danger/30"
      : "border-rule hover:border-muted focus:border-accent focus:ring-accent/25"
  }`;

  if (multiline) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid}
        rows={8}
        className={`${className} font-serif text-lg leading-relaxed`}
      />
    );
  }

  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-invalid={invalid}
      className={`${className} text-base`}
    />
  );
}
