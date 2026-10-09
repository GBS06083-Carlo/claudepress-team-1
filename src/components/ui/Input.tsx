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
  const className = `w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
    invalid ? "border-red-500" : "border-zinc-300"
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
        className={className}
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
      className={className}
    />
  );
}
