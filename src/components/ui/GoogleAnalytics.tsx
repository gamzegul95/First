"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_STORAGE_KEY, CONSENT_EVENT } from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(
    () => localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted"
  );

  useEffect(() => {
    function handleChange() {
      setEnabled(localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted");
    }
    window.addEventListener(CONSENT_EVENT, handleChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleChange);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
