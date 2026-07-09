"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/generated/prisma/client";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Çalışma Alanlarımız" },
  { href: "/makaleler", label: "Makaleler ve Güncel Bilgiler" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-ink-950/85 backdrop-blur-lg border-b border-ink-border"
          : "bg-gradient-to-b from-ink-950/70 via-ink-950/20 to-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo-mark.png"
            alt={settings.firmName}
            width={40}
            height={64}
            className="h-10 w-auto"
            priority
          />
          <span className="font-display leading-tight">
            <span className="block text-lg tracking-[0.12em] text-gold-100">
              AKKAYA
            </span>
            <span className="block text-[10px] tracking-[0.32em] text-gold-500">
              HUKUK &amp; DANIŞMANLIK
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors",
                  active ? "text-gold-300" : "text-stone-300 hover:text-gold-200"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-gold-400 transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-stone-300 hover:text-gold-200 transition-colors"
          >
            <PhoneCall className="h-4 w-4 text-gold-500" />
            {settings.phone}
          </a>
          <Link
            href="/iletisim"
            className="rounded-sm border border-gold-600/50 px-5 py-2.5 text-sm font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-100"
          >
            Randevu Alın
          </Link>
        </div>

        <button
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-gold-200 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink-border bg-ink-950/98 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-ink-border/60 py-4 text-lg text-stone-200 hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/iletisim"
                className="mt-6 rounded-sm bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-center text-sm font-semibold text-ink-950"
              >
                Randevu Alın
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
