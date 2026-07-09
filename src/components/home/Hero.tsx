"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function Hero({
  kicker,
  title,
  subtitle,
  ctaLabel,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}) {
  const lines = title.split("\n");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink-950 pt-28">
      {/* Base tonal gradient — a quiet transition between charcoal and rich black, no hard edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(46,52,64,0.35),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-gold-600/[0.07] blur-[180px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-gold-500/[0.05] blur-[140px]"
      />

      {/* Emblem — presented as a quiet, glass-framed object rather than a flat watermark */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[2%] top-1/2 hidden -translate-y-1/2 items-center justify-center lg:flex"
      >
        <div className="relative flex h-[30rem] w-[30rem] items-center justify-center">
          <div className="glass-panel absolute inset-0 rounded-full shadow-[0_0_120px_-20px_rgba(200,162,74,0.18)]" />
          <div
            aria-hidden
            className="absolute inset-8 rounded-full border border-gold-500/[0.14]"
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-70 animate-glow-pulse"
            style={{
              background:
                "conic-gradient(from 210deg at 50% 50%, transparent 0deg, rgba(216,191,114,0.16) 40deg, transparent 90deg)",
            }}
          />
          <Image
            src="/logo-mark.png"
            alt=""
            width={300}
            height={460}
            className="relative h-64 w-auto opacity-[0.92] drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)] animate-float"
          />
        </div>
      </motion.div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-gold-400">
            <span className="h-px w-9 bg-gradient-to-r from-gold-500 to-transparent" />
            {kicker}
          </p>

          <h1 className="mt-9 font-display text-5xl font-bold leading-[1.1] tracking-[-0.01em] text-foreground sm:text-6xl lg:text-[4.75rem]">
            {lines.map((line, i) => (
              <span
                key={i}
                className={i === lines.length - 1 ? "block text-gold-gradient" : "block"}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-lg font-light leading-[1.75] text-foreground/60">
            {subtitle}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton href="/iletisim" size="lg">
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </LinkButton>
            <LinkButton href="/hizmetler" variant="outline" size="lg">
              Faaliyet Alanlarımız
            </LinkButton>
          </div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.34em] text-foreground/35">
          Keşfedin
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-foreground/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-gold-400 to-transparent"
            animate={{ y: ["-0.75rem", "2.5rem"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
