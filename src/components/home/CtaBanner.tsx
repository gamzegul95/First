import { PhoneCall } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export default function CtaBanner({ phone }: { phone: string }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-600/[0.06] blur-[150px]"
      />
      <Container>
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[4px] px-8 py-20 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
            />
            <p className="relative text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-gold-400">
              AKKAYA HUKUK &amp; DANIŞMANLIK
            </p>
            <h2 className="relative mt-6 font-display text-3xl font-bold tracking-[-0.01em] text-foreground sm:text-4xl lg:text-[2.75rem]">
              Hukuki Sürecinizde{" "}
              <span className="text-gold-gradient">Yanınızdayız</span>
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-base font-light leading-[1.75] text-foreground/50">
              Davanız veya danışmanlık ihtiyacınız hakkında görüşmek için
              bizimle iletişime geçin; en kısa sürede size dönüş yapalım.
            </p>
            <div className="relative mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LinkButton href="/iletisim" size="lg">
                Bize Ulaşın
              </LinkButton>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-[2px] border border-gold-600/40 px-9 py-4 text-[0.95rem] font-medium text-gold-200 transition-colors duration-500 hover:border-gold-400/70 hover:text-gold-100"
              >
                <PhoneCall className="h-4 w-4" />
                {phone}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
