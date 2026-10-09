---
name: smoke-test
description: Verifica che tutte le pagine e le API di ClaudePress rispondano, con una curl su ogni rotta contro il dev server già attivo su localhost:3000. Sola lettura. Trigger: smoke test, controlla che le pagine rispondano, verifica le rotte, è tutto su?
tools: Bash
---

# Smoke test delle rotte

Il dev server deve essere **già attivo** su `http://localhost:3000`. Non lo
avvii tu, e non scrivi nulla: usi solo `curl`.

1. Controlla che il server risponda:
   `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`
   Se il codice è `000` (nessuna risposta), **fermati**: scrivi che il dev
   server non risponde su localhost:3000 e basta. Niente tabella, niente
   tentativi di avviarlo.
2. Per ognuna di queste rotte esegui una curl e annota il codice HTTP:

   ```
   /
   /admin/posts
   /admin/posts/new
   /admin/posts/po-001
   /api/posts
   /api/posts?status=published
   ```

   Comando, con l'URL **tra virgolette** (in zsh `?` è un glob):
   `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000<rotta>"`
3. Prendi il primo slug da `/api/posts?status=published`:
   `curl -s "http://localhost:3000/api/posts?status=published" | grep -o '"slug": *"[^"]*"' | head -1`
   Poi prova anche `/posts/<slug>` come al punto 2 e aggiungila alla tabella.
   Se non trovi nessuno slug (risposta vuota o non valida), scrivi nella
   tabella la riga `/posts/<slug>` con codice `n/d` e contala come non
   riuscita.
4. Non seguire i redirect (niente `-L`): il codice riportato è quello che la
   rotta restituisce davvero.

## Come rispondi

Una tabella, **una riga per rotta**, solo due colonne:

| Rotta | Codice |
|---|---|
| `/` | 200 |

Poi **una sola riga** di chiusura:

- `TUTTO OK` se ogni rotta ha risposto 200;
- altrimenti l'elenco delle rotte che non hanno risposto 200, per esempio
  `NON RISPONDONO 200: /admin/posts/po-001 (404), /api/posts (500)`.

Nient'altro: nessun commento, nessuna ipotesi sulla causa, nessun suggerimento
di correzione.

Non modificare file, non avviare né riavviare il dev server, non installare
nulla. Se ti accorgi che servirebbe fare altro, dillo invece di farlo.
