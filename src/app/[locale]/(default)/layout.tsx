import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";
import { ReactNode } from "react";
import { getLandingPage } from "@/services/page";
import Feedback from "@/components/feedback";
import LandingTheme from "@/components/theme/landing-theme";
import { Fraunces, Space_Grotesk } from "next/font/google";
import BlogPrefetch from "@/components/prefetch/blog-prefetch";
import PerformanceOptimizer from "@/components/performance/optimizer";

const landingSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-landing-sans",
  display: "swap",
});

const landingSerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-landing-serif",
  display: "swap",
});

export default async function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);

  return (
    <LandingTheme className={`${landingSans.variable} ${landingSerif.variable}`}>
      {page.header && <Header header={page.header} />}
      <BlogPrefetch locale={locale} />
      <PerformanceOptimizer />
      <main className="overflow-x-hidden">{children}</main>
      {page.footer && <Footer footer={page.footer} />}
      {/* <Feedback socialLinks={page.footer?.social?.items} /> */}
    </LandingTheme>
  );
}
