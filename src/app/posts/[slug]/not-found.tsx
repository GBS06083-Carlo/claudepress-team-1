import Link from "next/link";
import { ROUTES } from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";

export default function PostNotFound() {
  return (
    <div className="space-y-6">
      <EmptyState
        title="Questo post non esiste"
        description="Il link potrebbe essere sbagliato, oppure il post è stato rimosso."
      />
      <Link href={ROUTES.home} className="inline-block text-accent underline">
        Torna alla home
      </Link>
    </div>
  );
}
