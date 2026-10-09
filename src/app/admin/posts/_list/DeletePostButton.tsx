"use client";
// Client component: serve onClick, stato di invio e router.refresh() dopo la DELETE.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Eliminare «${title}»? L'operazione non si può annullare.`)) return;

    setPending(true);
    setFailed(false);
    const res = await fetch(API_ROUTES.post(id), { method: "DELETE" }).catch(() => null);
    setPending(false);

    if (res?.ok) router.refresh();
    else setFailed(true);
  }

  return (
    <span className="inline-flex items-center gap-3">
      <Button variant="danger" disabled={pending} onClick={handleDelete}>
        {pending ? "Elimino…" : "Elimina"}
      </Button>
      {failed && (
        <span role="alert" className="text-sm text-danger">
          Eliminazione non riuscita
        </span>
      )}
    </span>
  );
}
