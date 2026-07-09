"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Home,
  Info,
  UserRound,
  Briefcase,
  Newspaper,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/(dashboard)/actions";

const links = [
  { href: "/admin", label: "Genel Bakış", icon: LayoutDashboard, exact: true },
  { href: "/admin/ayarlar", label: "Site Ayarları", icon: Settings },
  { href: "/admin/ana-sayfa", label: "Ana Sayfa", icon: Home },
  { href: "/admin/hakkimizda", label: "Hakkımızda", icon: Info },
  { href: "/admin/avukat-profili", label: "Avukat Profili", icon: UserRound },
  { href: "/admin/hizmetler", label: "Çalışma Alanları", icon: Briefcase },
  { href: "/admin/makaleler", label: "Makaleler", icon: Newspaper },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ink-border bg-ink-900/60">
      <div className="flex items-center gap-3 border-b border-ink-border px-6 py-6">
        <Image src="/logo-mark.png" alt="Akkaya Hukuk" width={30} height={46} className="h-8 w-auto" />
        <div>
          <p className="font-display text-sm tracking-[0.1em] text-gold-100">AKKAYA</p>
          <p className="text-[10px] tracking-[0.2em] text-gold-500">YÖNETİM PANELİ</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {links.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold-500/10 text-gold-300 border border-gold-700/40"
                  : "text-stone-400 hover:bg-ink-800 hover:text-stone-200 border border-transparent"
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-ink-border px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-stone-400 transition-colors hover:bg-ink-800 hover:text-stone-200"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          Siteyi Görüntüle
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Çıkış Yap
          </button>
        </form>
      </div>
    </aside>
  );
}
