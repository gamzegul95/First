"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Item = { title: string; description: string };

export default function RepeatingItems({
  name,
  initialItems,
  itemLabel = "Öğe",
}: {
  name: string;
  initialItems: Item[];
  itemLabel?: string;
}) {
  const [items, setItems] = useState<Item[]>(
    initialItems.length > 0 ? initialItems : [{ title: "", description: "" }]
  );

  function update(index: number, field: keyof Item, value: string) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, { title: "", description: "" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-sm border border-ink-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
                {itemLabel} {i + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-stone-500 transition-colors hover:text-red-400"
                aria-label="Kaldır"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <input
              type="text"
              value={item.title}
              onChange={(e) => update(i, "title", e.target.value)}
              placeholder="Başlık"
              className="mt-3 w-full rounded-sm border border-ink-border bg-ink-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none transition-colors focus:border-gold-500"
            />
            <textarea
              value={item.description}
              onChange={(e) => update(i, "description", e.target.value)}
              placeholder="Açıklama"
              rows={2}
              className="mt-3 w-full resize-none rounded-sm border border-ink-border bg-ink-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none transition-colors focus:border-gold-500"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-400 transition-colors hover:text-gold-200"
      >
        <Plus className="h-4 w-4" />
        {itemLabel} Ekle
      </button>
    </div>
  );
}
