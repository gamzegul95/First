import Link from "next/link";
import { Briefcase, Newspaper, Mail, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [serviceCount, articleCount, messageCount, unreadCount] = await Promise.all([
    prisma.service.count(),
    prisma.article.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const cards = [
    { label: "Çalışma Alanları", value: serviceCount, href: "/admin/hizmetler", icon: Briefcase },
    { label: "Makaleler", value: articleCount, href: "/admin/makaleler", icon: Newspaper },
    { label: "Toplam Mesaj", value: messageCount, href: "/admin/mesajlar", icon: Mail },
    { label: "Okunmamış Mesaj", value: unreadCount, href: "/admin/mesajlar", icon: Mail },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-50">Genel Bakış</h1>
      <p className="mt-1 text-sm text-stone-400">
        Sitenizin içeriğini buradan yönetebilirsiniz.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-sm border border-ink-border bg-ink-900/40 p-6 transition-colors hover:border-gold-600/50"
          >
            <card.icon className="h-5 w-5 text-gold-500" />
            <p className="mt-4 font-display text-3xl font-semibold text-stone-100">
              {card.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">
              {card.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-sm border border-ink-border bg-ink-900/40 p-8">
        <h2 className="font-display text-lg font-semibold text-stone-100">Hızlı Erişim</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { href: "/admin/ayarlar", label: "Site ayarlarını düzenle" },
            { href: "/admin/ana-sayfa", label: "Ana sayfa içeriğini düzenle" },
            { href: "/admin/hakkimizda", label: "Hakkımızda içeriğini düzenle" },
            { href: "/admin/avukat-profili", label: "Avukat profilini düzenle" },
            { href: "/admin/hizmetler", label: "Çalışma alanı ekle / düzenle" },
            { href: "/admin/makaleler", label: "Makale ekle / düzenle" },
            { href: "/admin/mesajlar", label: "Gelen mesajları görüntüle" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-sm border border-ink-border px-4 py-3 text-sm text-stone-300 transition-colors hover:border-gold-600/50 hover:text-gold-200"
            >
              {item.label}
              <ArrowRight className="h-4 w-4 text-gold-500 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
