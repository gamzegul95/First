import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyUs from "@/components/home/WhyUs";
import CtaBanner from "@/components/home/CtaBanner";
import { getAboutContent, getHomeContent, getServices, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [home, about, services, settings] = await Promise.all([
    getHomeContent(),
    getAboutContent(),
    getServices(),
    getSiteSettings(),
  ]);

  const stats = [
    { value: home.stat1Value, label: home.stat1Label },
    { value: home.stat2Value, label: home.stat2Label },
    { value: home.stat3Value, label: home.stat3Label },
    { value: home.stat4Value, label: home.stat4Label },
  ];

  return (
    <>
      <Hero
        kicker={home.heroKicker}
        title={home.heroTitle}
        subtitle={home.heroSubtitle}
        ctaLabel={home.heroCtaLabel}
      />
      <StatsBar stats={stats} />
      <AboutPreview title={about.title} text={about.intro} />
      <ServicesPreview services={services} />
      <WhyUs
        title={home.whyUsTitle}
        subtitle={home.whyUsSubtitle}
        items={home.whyUsItems}
      />
      <CtaBanner phone={settings.phone} />
    </>
  );
}
