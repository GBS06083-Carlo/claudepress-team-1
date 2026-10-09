---
name: new-form
description: Crea il form del post (creazione e modifica) con Field, Input e Button condivisi e validazione dal contratto. Trigger: nuovo form, il form di creazione, il modulo del post.
---

# Nuovo form del post

1. Crea `src/app/admin/_components/PostForm.tsx`, che riceve `postId?: string`
   e `initialValues?: Partial<PostInput>`. Senza `postId` crea, con `postId` modifica.
2. Prima riga `"use client"`, seguita da un commento che dice perché (stato del form ed event handler).
3. Usa **solo** `Field`, `Input` e `Button` da `@/components/ui/Field`,
   `@/components/ui/Input` e `@/components/ui/Button`. Niente `<input>`,
   `<textarea>` o `<button>` scritti a mano. Ogni `Input` sta dentro un `Field`
   con `htmlFor` uguale al suo `id`; `content` usa `multiline`.
4. `status` lo scelgono due `Button` con `onClick` che invia con quello status: "Salva bozza" → `draft`, "Pubblica" → `published`.
5. Al submit valida con `postInputSchema.safeParse` da `@/contracts/blog`.
   Niente controlli scritti a mano. Se fallisce, trasforma `issues` in
   `Record<campo, messaggio>` e non inviare.
6. Ogni errore va nel prop `error` del `Field` del suo campo, e l'`Input` riceve `invalid`.
   Mai un riquadro di errori in cima.
7. Invia con `POST` su `API_ROUTES.posts` o con `PATCH` su `API_ROUTES.post(postId)`:
   path relativo, mai URL scritti a mano.
8. Se la risposta non è ok, leggila come `ApiError`. Con `code === "validation_error"`,
   metti `error.fields` negli stessi `Field`. Con gli altri codici, mostra
   `error.message` sotto i bottoni.
9. Tieni uno stato `submitting`: `disabled` su tutti i `Button` mentre vale `true`,
   ed esci subito dal submit se è già `true`.
10. Testi visibili in italiano, niente `any`. Alla fine esegui `npm run check` e riporta l'esito in una riga.

Se ti serve un controllo o una prop che il contratto non ha, fermati e dillo.
