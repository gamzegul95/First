"use client";

import { useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "akkaya-cerez-onayi";

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY));

  function decide(value: "accepted" | "rejected") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez onayı"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-border bg-ink-950/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between">
        <p className="text-sm leading-relaxed text-stone-300">
          Sitemizde deneyiminizi iyileştirmek için yalnızca zorunlu çerezler
          kullanılmaktadır.{" "}
          <Link
            href="/gizlilik-ve-cerez-politikasi"
            className="text-gold-400 underline underline-offset-2 hover:text-gold-300"
          >
            Çerez Politikamızı
          </Link>{" "}
          inceleyebilirsiniz.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-[2px] border border-ink-border px-5 py-2.5 text-sm font-medium text-stone-300 transition-colors hover:border-gold-500/50 hover:text-gold-200"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-[2px] border border-gold-500 bg-gold-500 px-5 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-400"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
