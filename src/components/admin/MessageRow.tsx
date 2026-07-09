"use client";

import { useState, useTransition } from "react";
import { ChevronDown, Mail, MailOpen, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";
import { toggleMessageRead, deleteMessage } from "@/app/admin/(dashboard)/mesajlar/actions";
import type { ContactMessage } from "@/generated/prisma/client";

export default function MessageRow({ message }: { message: ContactMessage }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "rounded-sm border bg-ink-900/40 transition-colors",
        message.isRead ? "border-ink-border" : "border-gold-700/40"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        {!message.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-gold-500" />}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium text-stone-100">{message.name}</p>
            {message.subject && (
              <span className="truncate text-xs text-stone-500">— {message.subject}</span>
            )}
          </div>
          <p className="truncate text-xs text-stone-500">{message.email}</p>
        </div>
        <span className="hidden shrink-0 text-xs text-stone-500 sm:block">
          {new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", year: "numeric" }).format(
            new Date(message.createdAt)
          )}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-stone-500 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t border-ink-border p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-300">{message.message}</p>
          {message.phone && (
            <p className="mt-3 flex items-center gap-2 text-sm text-stone-400">
              <Phone className="h-3.5 w-3.5 text-gold-500" />
              {message.phone}
            </p>
          )}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                startTransition(() => {
                  toggleMessageRead(message.id, !message.isRead);
                })
              }
              className="inline-flex items-center gap-1.5 rounded-sm border border-ink-border px-3 py-1.5 text-xs text-stone-300 transition-colors hover:border-gold-500 hover:text-gold-200"
            >
              {message.isRead ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
              {message.isRead ? "Okunmadı İşaretle" : "Okundu İşaretle"}
            </button>
            <a
              href={`mailto:${message.email}`}
              className="inline-flex items-center gap-1.5 rounded-sm border border-ink-border px-3 py-1.5 text-xs text-stone-300 transition-colors hover:border-gold-500 hover:text-gold-200"
            >
              Yanıtla
            </a>
            <DeleteButton action={deleteMessage.bind(null, message.id)} confirmText="Bu mesajı silmek istediğinize emin misiniz?" />
          </div>
        </div>
      )}
    </div>
  );
}
