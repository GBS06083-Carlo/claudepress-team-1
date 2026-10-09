---
name: ship
description: Porta il lavoro finito da locale a remoto in un colpo: check, commit con messaggio scritto dal diff e push sul branch corrente. Usala quando il pezzo è chiuso e vuoi mandarlo su. Trigger:manda su, pusha il lavoro, chiudi il pezzo, ship, committa e pusha.
allowed-tools: Read, Grep, Bash(git:*), Bash(npm run:*)
---

# Dal locale al remoto

Esegui i passi in ordine. Ogni fallimento ti ferma: niente "sistemare al volo".

1. Lancia `npm run check`. Se fallisce, **fermati**: riporta l'errore così
   com'è e non fare altro.
2. Lancia `git status --short` e `git diff` (più `git diff --staged` se c'è
   qualcosa in staging). Se ci sono modifiche già in staging, lavora su quelle
   e non aggiungere il resto.
3. Scrivi il messaggio: una riga, in inglese, conventional commit (`feat:`,
   `fix:`, `docs:`, `refactor:`, `test:`, `chore:`). Dice cosa cambia per chi
   usa il progetto, non quali file hai toccato. Se il diff contiene due cose
   scollegate, dillo, proponi due commit e fermati.
4. Aggiungi i file per nome (mai `git add -A` senza aver letto lo status) e
   committa con quel messaggio.
5. Fai `git push` sul branch corrente. Se il branch non ha upstream, usa
   `git push -u origin <branch>`.
6. Se il push viene rifiutato, **non forzare** (niente `--force`, niente
   `--force-with-lease`): riporta l'errore così com'è e fermati.
7. Chiudi dicendo il messaggio usato e il branch su cui hai pushato. Se ti sei
   fermato al passo 1, 3 o 6, solo l'errore o il motivo, e nient'altro.
