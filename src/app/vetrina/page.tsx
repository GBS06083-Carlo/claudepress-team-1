// Client component: Input vuole onChange e Button onClick, che una pagina server non può passare.
"use client";

import { useState, type ReactNode } from "react";
import { ROUTES } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { PostCard } from "@/components/ui/PostCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

function Section({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-gray-200 pt-6">
      <h2 className="font-mono text-sm font-semibold text-gray-500">{name}</h2>
      {children}
    </section>
  );
}

export default function VetrinaPage() {
  const [title, setTitle] = useState("Il mio primo post");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-10">
      <h1 className="text-2xl font-bold">Vetrina dei componenti</h1>

      <Section name="PostCard">
        <PostCard
          title="Come abbiamo smesso di temere i deploy del venerdì"
          excerpt="Tre abitudini semplici che hanno reso i rilasci noiosi, nel senso migliore del termine."
          author="Giulia Rossi"
          date="2026-09-28T10:30:00.000Z"
          href={ROUTES.post("deploy-del-venerdi")}
        />
        <PostCard
          title="Markdown o testo semplice?"
          excerpt="Pro e contro di due formati per i contenuti di un blog piccolo."
          author="Luca Bianchi"
          date="2026-10-05T08:00:00.000Z"
          href={ROUTES.post("markdown-o-testo-semplice")}
        />
      </Section>

      <Section name="StatusBadge">
        <div className="flex gap-3">
          <StatusBadge status="published" />
          <StatusBadge status="draft" />
        </div>
      </Section>

      <Section name="Button">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => console.log("primary")}>
            Pubblica
          </Button>
          <Button variant="secondary" onClick={() => console.log("secondary")}>
            Annulla
          </Button>
          <Button variant="danger" onClick={() => console.log("danger")}>
            Elimina
          </Button>
          <Button disabled>Disabilitato</Button>
        </div>
      </Section>

      <Section name="Field + Input">
        <Field label="Titolo" htmlFor="vetrina-title">
          <Input id="vetrina-title" name="title" value={title} onChange={setTitle} />
        </Field>
        <Field label="Contenuto" htmlFor="vetrina-content">
          <Input
            id="vetrina-content"
            name="content"
            value={content}
            onChange={setContent}
            multiline
            placeholder="Scrivi qui il testo del post…"
          />
        </Field>
        <Field
          label="Autore"
          htmlFor="vetrina-author"
          error="L'autore non può essere vuoto"
        >
          <Input
            id="vetrina-author"
            name="author"
            value={author}
            onChange={setAuthor}
            invalid
          />
        </Field>
      </Section>

      <Section name="EmptyState">
        <EmptyState
          title="Nessun post"
          description="Quando pubblicherai il primo post, comparirà qui."
        />
        <EmptyState title="Nessun risultato" />
      </Section>
    </main>
  );
}
