---
name: new-page
description: Crea una pagina del sito pubblico come server component che carica i dati dalle API del contratto e gestisce dati, elenco vuoto, fetch fallita e 404. Trigger: nuova pagina, crea la home, la pagina del post, scrivi la pagina, aggiungi una rotta pubblica.
---

# Nuova pagina pubblica

Ricevi la pagina da fare, per esempio la home o la pagina di un post.

1. Apri `src/contracts/blog.ts` e trova in `API_ROUTES` la rotta che serve
   (`publishedPosts` per un elenco, `postBySlug` per un post).
   **Se non c'è, fermati e dillo**: il contratto non si modifica.
2. Crea solo `src/app/<rotta>/page.tsx` (home: `src/app/page.tsx`; post:
   `src/app/posts/[slug]/page.tsx`). Non toccare admin, api, server.
3. Server component: **niente `"use client"`**. In Next 16 `params` è una
   Promise: prima leggi la guida in `node_modules/next/dist/docs/`.
4. Carica con `fetch(apiUrl(API_ROUTES.x), { cache: "no-store" })`.
   Mai un path relativo, mai un URL scritto a mano. Import sempre con `@/`.
5. Avvolgi la fetch in try/catch e gestisci **tre casi**, più il 404:
   - **fetch fallita** (eccezione o `!res.ok`, 404 escluso): messaggio di
     errore in italiano, senza lanciare;
   - **elenco vuoto**: `<EmptyState title="..." />` da `@/components/ui/`;
   - **dati presenti**: tipizzali con `Post`, mostrali con i componenti `ui`
     e linka con `ROUTES`, mai a mano;
   - **404** (la risorsa non esiste): `notFound()` da `next/navigation`,
     mai `return null`.
6. Testi visibili in **italiano**; nomi di variabili e file in inglese.
7. Alla fine esegui `npm run check` e riporta l'esito in una riga.

Tocca **solo** il file della pagina. Se ti accorgi che servirebbe cambiare
altro, dillo invece di farlo.
