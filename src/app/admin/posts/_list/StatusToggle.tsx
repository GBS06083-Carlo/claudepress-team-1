"use client";
// Client component: serve onClick, stato di invio e router.refresh() dopo la PATCH.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES, type PostPatch, type PostStatus } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";

export function StatusToggle({ id, status }: { id: string; status: PostStatus }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleToggle() {
    const patch: PostPatch = { status: status === "draft" ? "published" : "draft" };

    setPending(true);
    setFailed(false);
    const res = await fetch(API_ROUTES.post(id), {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(() => null);
    setPending(false);

    if (res?.ok) router.refresh();
    else setFailed(true);
  }

  return (
    <span className="inline-flex items-center gap-3">
      <Button variant="secondary" disabled={pending} onClick={handleToggle}>
        {status === "draft" ? "Pubblica" : "Riporta in bozza"}
      </Button>
      {failed && (
        <span role="alert" className="text-sm text-danger">
          Aggiornamento non riuscito
        </span>
      )}
    </span>
  );
}
