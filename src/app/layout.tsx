import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import { getLocale, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/locale";
import { cn } from "@/lib/utils";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Ensure text is visible during font loading
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  setRequestLocale(locale);

  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";
  const googleAdsenseCode = process.env.NEXT_PUBLIC_GOOGLE_ADCODE || "";

  return (
    <html lang={locale} suppressHydrationWarning className={`${fontSans.variable}`}>
      <head>
        {/* Critical meta tags first */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#1a1510" />
        <meta name="color-scheme" content="dark" />

        {googleAdsenseCode && (
          <meta name="google-adsense-account" content={googleAdsenseCode} />
        )}

        {/* Favicon with sizes for better performance */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* DNS Prefetch and Preconnect for faster external resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for common external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://replicate.delivery" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

        {locales &&
          locales.map((loc) => (
            <link
              key={loc}
              rel="alternate"
              hrefLang={loc}
              href={`${webUrl}${loc === "en" ? "" : `/${loc}`}/`}
            />
          ))}
        <link rel="alternate" hrefLang="x-default" href={webUrl} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
