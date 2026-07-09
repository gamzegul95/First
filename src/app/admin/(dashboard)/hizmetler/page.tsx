import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { DynamicIcon } from "@/lib/icon-map";
import { getServices } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteService } from "./actions";

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-stone-50">Hizmetler</h1>
          <p className="mt-1 text-sm text-stone-400">Hizmetlerinizi ekleyin, düzenleyin veya kaldırın.</p>
        </div>
        <Link
          href="/admin/hizmetler/yeni"
          className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_100%] px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-500 hover:bg-[position:100%_0]"
        >
          <Plus className="h-4 w-4" />
          Yeni Hizmet
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-4 rounded-sm border border-ink-border bg-ink-900/40 p-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold-700/40 bg-gold-500/5 text-gold-400">
              <DynamicIcon name={service.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-stone-100">{service.title}</p>
              <p className="truncate text-xs text-stone-500">/hizmetler/{service.slug}</p>
            </div>
            <span className="hidden shrink-0 text-xs text-stone-500 sm:block">Sıra: {service.order}</span>
            <Link
              href={`/admin/hizmetler/${service.id}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-ink-border text-stone-400 transition-colors hover:border-gold-500 hover:text-gold-300"
            >
              <Pencil className="h-4 w-4" />
            </Link>
            <DeleteButton action={deleteService.bind(null, service.id)} confirmText="Bu hizmeti silmek istediğinize emin misiniz?" />
          </div>
        ))}
        {services.length === 0 && (
          <p className="rounded-sm border border-dashed border-ink-border p-8 text-center text-sm text-stone-500">
            Henüz hizmet eklenmedi.
          </p>
        )}
      </div>
    </div>
  );
}
