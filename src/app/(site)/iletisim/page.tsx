import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getSiteSettings } from "@/lib/data";

const description = "AKKAYA HUKUK & DANIŞMANLIK ile iletişime geçin.";

export const metadata: Metadata = {
  title: "İletişim",
  description,
  alternates: { canonical: "/iletisim" },
  openGraph: { title: "İletişim", description, url: "/iletisim" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const infoItems = [
    { icon: MapPin, label: "Adres", value: settings.address },
    { icon: Phone, label: "Telefon", value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "E-posta", value: settings.email, href: `mailto:${settings.email}` },
    { icon: Clock, label: "Çalışma Saatleri", value: settings.workingHours },
  ];

  const mapSrc =
    settings.mapEmbedUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ])}
      />
      <PageHero
        kicker="İletişim"
        title="Bizimle İletişime Geçin"
        description="Sorularınız ve hukuki danışmanlık talepleriniz için formu doldurun ya da doğrudan bizimle iletişime geçin."
        crumb="İletişim"
      />

      <section className="relative bg-ink-950 py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <div className="space-y-5">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-sm border border-ink-border bg-ink-900/40 p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold-700/40 bg-gold-500/5 text-gold-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-sm text-stone-200 transition-colors hover:text-gold-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-stone-200">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-sm border border-ink-border">
                <iframe
                  title="Ofis Konumu"
                  src={mapSrc}
                  width="100%"
                  height="260"
                  loading="lazy"
                  className="grayscale invert-[0.92] contrast-[1.1]"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-sm border border-ink-border bg-ink-900/30 p-8 sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-stone-50">
                  Ön Görüşme Talep Edin
                </h2>
                <p className="mt-2 text-sm text-stone-400">
                  Formu doldurun, ekibimiz 24 saat içinde sizinle iletişime geçsin.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
