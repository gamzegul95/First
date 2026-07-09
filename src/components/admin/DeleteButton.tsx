"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  confirmText = "Bu kaydı silmek istediğinize emin misiniz?",
}: {
  action: () => Promise<void>;
  confirmText?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmText)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-ink-border text-stone-400 transition-colors hover:border-red-500/50 hover:text-red-400 disabled:opacity-50"
      aria-label="Sil"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
