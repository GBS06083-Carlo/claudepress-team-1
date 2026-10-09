"use client";
// Client component: tiene lo stato dei campi e gestisce submit e click sui bottoni.

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  API_ROUTES,
  ROUTES,
  postInputSchema,
  type ApiError,
  type PostInput,
  type PostStatus,
} from "@/contracts/blog";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

type PostFormProps = {
  postId?: string;
  initialValues?: Partial<PostInput>;
};

type FieldErrors = Partial<Record<keyof PostInput, string>>;

const STATUS_OPTIONS: { value: PostStatus; label: string }[] = [
  { value: "draft", label: "Bozza" },
  { value: "published", label: "Pubblicato" },
];

export function PostForm({ postId, initialValues }: PostFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PostInput>({
    title: initialValues?.title ?? "",
    excerpt: initialValues?.excerpt ?? "",
    content: initialValues?.content ?? "",
    author: initialValues?.author ?? "",
    status: initialValues?.status ?? "draft",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function setValue<K extends keyof PostInput>(key: K, value: PostInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setFormError(null);
    const parsed = postInputSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof PostInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch(postId ? API_ROUTES.post(postId) : API_ROUTES.posts, {
        method: postId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        router.push(ROUTES.adminPosts);
        router.refresh();
        return;
      }

      const { error } = (await response.json()) as ApiError;
      if (error.code === "validation_error" && error.fields) {
        setErrors(error.fields);
      } else {
        setFormError(error.message);
      }
    } catch {
      setFormError("Impossibile raggiungere il server. Controlla la connessione e riprova.");
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Field label="Titolo" htmlFor="title" error={errors.title}>
        <Input
          id="title"
          name="title"
          value={values.title}
          onChange={(value) => setValue("title", value)}
          invalid={Boolean(errors.title)}
        />
      </Field>

      <Field label="Sommario" htmlFor="excerpt" error={errors.excerpt}>
        <Input
          id="excerpt"
          name="excerpt"
          value={values.excerpt}
          onChange={(value) => setValue("excerpt", value)}
          placeholder="Una o due frasi che invoglino a leggere"
          invalid={Boolean(errors.excerpt)}
        />
      </Field>

      <Field label="Contenuto" htmlFor="content" error={errors.content}>
        <Input
          id="content"
          name="content"
          value={values.content}
          onChange={(value) => setValue("content", value)}
          multiline
          invalid={Boolean(errors.content)}
        />
      </Field>

      <Field label="Autore" htmlFor="author" error={errors.author}>
        <Input
          id="author"
          name="author"
          value={values.author}
          onChange={(value) => setValue("author", value)}
          invalid={Boolean(errors.author)}
        />
      </Field>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[0.9375rem] font-semibold text-ink">Stato</legend>
        <div className="flex gap-3">
          {STATUS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={values.status === option.value ? "primary" : "secondary"}
              disabled={submitting}
              onClick={() => setValue("status", option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        {errors.status && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {errors.status}
          </p>
        )}
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-rule pt-6">
        <div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Salvataggio…" : postId ? "Salva modifiche" : "Crea post"}
          </Button>
        </div>
        {formError && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {formError}
          </p>
        )}
      </div>
    </form>
  );
}
