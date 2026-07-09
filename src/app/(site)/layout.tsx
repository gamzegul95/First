import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsentLoader";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { legalServiceSchema } from "@/lib/structured-data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = `${settings.firmName} | ${settings.tagline}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${settings.firmName}`,
    },
    description: settings.metaDescription,
    keywords: [
      "avukat",
      "hukuk bürosu",
      "Ankara avukat",
      "Çankaya avukat",
      "arabulucu",
      "miras hukuku",
      "aile hukuku",
      "iş hukuku",
      "ticaret hukuku",
      "gayrimenkul hukuku",
      settings.firmName,
    ],
    authors: [{ name: settings.firmName }],
    icons: {
      icon: "/icon.png",
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: SITE_URL,
      siteName: settings.firmName,
      title,
      description: settings.metaDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: settings.firmName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: settings.metaDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-950 text-foreground bg-noise">
        <JsonLd data={legalServiceSchema(settings)} />
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
