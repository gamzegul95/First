import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <Link href="/admin/hizmetler" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-gold-300">
        <ChevronLeft className="h-4 w-4" />
        Hizmetler
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-stone-50">Yeni Hizmet</h1>

      <div className="mt-8">
        <ServiceForm action={createService} saveLabel="Oluştur" />
      </div>
    </div>
  );
}
