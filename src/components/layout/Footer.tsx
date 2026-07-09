import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import type { SiteSettings } from "@/generated/prisma/client";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-border bg-ink-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-mark.png"
                alt={settings.firmName}
                width={34}
                height={54}
                className="h-9 w-auto"
              />
              <span className="font-display leading-tight">
                <span className="block text-base tracking-[0.12em] text-gold-100">
                  AKKAYA
                </span>
                <span className="block text-[9px] tracking-[0.3em] text-gold-500">
                  HUKUK &amp; DANIŞMANLIK
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-400">
              {settings.tagline}. Kurumsal ve bireysel müvekkillerimize
              stratejik, güvenilir ve sonuç odaklı hukuki danışmanlık
              sunuyoruz.
            </p>
            <div className="mt-6 flex gap-3">
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn'de takip edin"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-gold-300 transition-colors hover:border-gold-500 hover:text-gold-100"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram'da takip edin"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-gold-300 transition-colors hover:border-gold-500 hover:text-gold-100"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-[0.2em] text-gold-300">
              KURUMSAL
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-stone-400">
              <li><Link href="/hakkimizda" className="hover:text-gold-200 transition-colors">Hakkımızda</Link></li>
              <li><Link href="/hizmetler" className="hover:text-gold-200 transition-colors">Çalışma Alanlarımız</Link></li>
              <li><Link href="/makaleler" className="hover:text-gold-200 transition-colors">Makaleler ve Güncel Bilgiler</Link></li>
              <li><Link href="/iletisim" className="hover:text-gold-200 transition-colors">İletişim</Link></li>
              <li><Link href="/gizlilik-ve-cerez-politikasi" className="hover:text-gold-200 transition-colors">Gizlilik ve Çerez Politikası</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-[0.2em] text-gold-300">
              ÇALIŞMA ALANLARI
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-stone-400">
              <li><Link href="/hizmetler/sirketler-hukuku" className="hover:text-gold-200 transition-colors">Şirketler Hukuku</Link></li>
              <li><Link href="/hizmetler/ticaret-hukuku" className="hover:text-gold-200 transition-colors">Ticaret Hukuku</Link></li>
              <li><Link href="/hizmetler/gayrimenkul-hukuku" className="hover:text-gold-200 transition-colors">Gayrimenkul Hukuku</Link></li>
              <li><Link href="/hizmetler/aile-hukuku" className="hover:text-gold-200 transition-colors">Aile Hukuku</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-[0.2em] text-gold-300">
              İLETİŞİM
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-gold-200 transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-200 transition-colors">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-8 text-xs text-stone-400 sm:flex-row">
          <p>&copy; {year} {settings.firmName}. Tüm hakları saklıdır.</p>
          <p className="tracking-wide">{settings.workingHours}</p>
        </div>
        <p className="mt-4 text-center text-[11px] text-stone-400">
          Web sitesi <span className="text-gold-500">Osman Demiral</span> tarafından tasarlanıp geliştirilmiştir.
        </p>
      </Container>
    </footer>
  );
}
