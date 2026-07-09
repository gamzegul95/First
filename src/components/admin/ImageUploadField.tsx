"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageUploadField({
  label,
  name,
  defaultValue,
  description,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  description?: string;
  className?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Yükleme başarısız oldu.");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız oldu.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <label className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        {label}
      </label>
      {description && <p className="mt-1 text-xs text-stone-500">{description}</p>}

      <div className="mt-2 flex items-start gap-4">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-ink-border bg-ink-950/60">
          {/^https?:\/\//.test(url) ? (
            <Image src={url} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="px-2 text-center text-[10px] text-stone-600">Görsel yok</span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://... veya bilgisayarınızdan yükleyin"
            className="w-full rounded-sm border border-ink-border bg-ink-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none transition-colors focus:border-gold-500"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm border border-gold-700/40 px-3 py-1.5 text-xs font-medium text-gold-300 transition-colors hover:border-gold-500 hover:text-gold-100",
                uploading && "opacity-60"
              )}
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              {uploading ? "Yükleniyor..." : "Bilgisayardan Yükle"}
            </button>
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="inline-flex items-center gap-1 text-xs text-stone-500 transition-colors hover:text-red-400"
              >
                <X className="h-3.5 w-3.5" />
                Kaldır
              </button>
            )}
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
