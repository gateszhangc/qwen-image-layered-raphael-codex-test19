import dynamic from "next/dynamic";
import Branding from "@/components/blocks/branding";
import Hero from "@/components/blocks/hero";
import QwenImageLayered from "@/components/qwen-image-layered";
import { getLandingPage } from "@/services/page";
import { getPublicWallpapers } from "@/services/wallpaper";

const CTA = dynamic(() => import("@/components/blocks/cta"));
const FAQ = dynamic(() => import("@/components/blocks/faq"));
const Feature = dynamic(() => import("@/components/blocks/feature"));
const Feature1 = dynamic(() => import("@/components/blocks/feature1"));
const Feature2 = dynamic(() => import("@/components/blocks/feature2"));
const Feature3 = dynamic(() => import("@/components/blocks/feature3"));
const BenefitShowcase = dynamic(() => import("@/components/blocks/benefit-showcase"));
const Pricing = dynamic(() => import("@/components/blocks/pricing"));
const Showcase = dynamic(() => import("@/components/blocks/showcase"));
const Stats = dynamic(() => import("@/components/blocks/stats"));
const Testimonial = dynamic(() => import("@/components/blocks/testimonial"));
const ImageCropper = dynamic(() => import("@/components/image-cropper"));
const QwenImageEdit = dynamic(() => import("@/components/qwen-image-edit"));
const WallpaperGallery = dynamic(() => import("@/components/wallpaper"));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}`;
  }

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);
  const wallpapers = await getPublicWallpapers(6);
  const wallpaperData = wallpapers.map((wallpaper) => ({
    id: wallpaper.id || 0,
    src: wallpaper.img_url || "",
    alt: wallpaper.img_description || "AI Wallpaper",
  }));

  return (
    <>
      {page.hero && <Hero hero={page.hero} />}

      {/* <QwenImageEdit /> */}
      <section id="qwen-image-layered" className="landing-studio scroll-mt-28">
        <div className="container">
          <div className="landing-studio-shell">
            <div className="landing-studio-shell__glow" />
            <div className="landing-studio-shell__inner">
              <QwenImageLayered />
            </div>
          </div>
        </div>
      </section>
      {/* <WallpaperGallery wallpapers={wallpaperData} /> */}
      {/* <ImageCropper /> */}
      {page.branding && <Branding section={page.branding} />}
      {page.usage && <Feature3 section={page.usage} />}
      {page.introduce && <Feature1 section={page.introduce} />}
      {page.benefit && <Feature2 section={page.benefit} />}
      {page.benefit_showcase && (
        <BenefitShowcase section={page.benefit_showcase} />
      )}
      {page.feature && <Feature section={page.feature} />}
      {page.showcase && <Showcase section={page.showcase} />}
      {page.stats && <Stats section={page.stats} />}
      {page.pricing && <Pricing pricing={page.pricing} />}
      {page.testimonial && <Testimonial section={page.testimonial} />}
      {page.faq && <FAQ section={page.faq} />}
      {page.cta && <CTA section={page.cta} />}
    </>
  );
}
