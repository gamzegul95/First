import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateService, deleteService } from "../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin/hizmetler" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-gold-300">
          <ChevronLeft className="h-4 w-4" />
          Hizmetler
        </Link>
        <DeleteButton
          action={deleteService.bind(null, service.id)}
          confirmText="Bu hizmeti silmek istediğinize emin misiniz?"
        />
      </div>
      <h1 className="mt-4 font-display text-2xl font-semibold text-stone-50">{service.title}</h1>

      <div className="mt-8">
        <ServiceForm action={updateService.bind(null, service.id)} service={service} />
      </div>
    </div>
  );
}
