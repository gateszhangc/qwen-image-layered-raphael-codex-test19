import dynamic from "next/dynamic";
import { Suspense } from "react";
import Hero from "@/components/blocks/hero";
import { getLandingPage } from "@/services/page";
import { getPublicWallpapers } from "@/services/wallpaper";
import ReactDOM from "react-dom";

// Branding is below the fold, so lazy load it
const Branding = dynamic(() => import("@/components/blocks/branding"), {
  loading: () => (
    <div className="w-full py-8 animate-pulse">
      <div className="container mx-auto flex justify-center gap-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-8 w-24 bg-muted/30 rounded" />)}
      </div>
    </div>
  ),
});

// QwenImageLayered is below the fold, so lazy load it with a skeleton
const QwenImageLayered = dynamic(() => import("@/components/qwen-image-layered"), {
  loading: () => (
    <div className="w-full min-h-[400px] animate-pulse flex items-center justify-center">
      <div className="h-8 bg-muted/30 rounded-lg w-1/3" />
    </div>
  ),
});

// Loading skeleton component for better perceived performance
const SectionSkeleton = () => (
  <div className="w-full py-16 animate-pulse">
    <div className="container mx-auto">
      <div className="h-8 bg-muted/30 rounded-lg w-1/3 mx-auto mb-6" />
      <div className="h-4 bg-muted/20 rounded w-2/3 mx-auto mb-4" />
      <div className="h-4 bg-muted/20 rounded w-1/2 mx-auto" />
    </div>
  </div>
);

// Dynamic imports with loading states for below-the-fold components
const CTA = dynamic(() => import("@/components/blocks/cta"), {
  loading: () => <SectionSkeleton />,
});
const FAQ = dynamic(() => import("@/components/blocks/faq"), {
  loading: () => <SectionSkeleton />,
});
const Feature = dynamic(() => import("@/components/blocks/feature"), {
  loading: () => <SectionSkeleton />,
});
const Feature1 = dynamic(() => import("@/components/blocks/feature1"), {
  loading: () => <SectionSkeleton />,
});
const Feature2 = dynamic(() => import("@/components/blocks/feature2"), {
  loading: () => <SectionSkeleton />,
});
const Feature3 = dynamic(() => import("@/components/blocks/feature3"), {
  loading: () => <SectionSkeleton />,
});
const BenefitShowcase = dynamic(() => import("@/components/blocks/benefit-showcase"), {
  loading: () => <SectionSkeleton />,
});
const Pricing = dynamic(() => import("@/components/blocks/pricing"), {
  loading: () => <SectionSkeleton />,
});
const Showcase = dynamic(() => import("@/components/blocks/showcase"), {
  loading: () => <SectionSkeleton />,
});
const Stats = dynamic(() => import("@/components/blocks/stats"), {
  loading: () => <SectionSkeleton />,
});
const Testimonial = dynamic(() => import("@/components/blocks/testimonial"), {
  loading: () => <SectionSkeleton />,
});
const ImageCropper = dynamic(() => import("@/components/image-cropper"), {
  loading: () => <SectionSkeleton />,
});
const QwenImageEdit = dynamic(() => import("@/components/qwen-image-edit"), {
  loading: () => <SectionSkeleton />,
});
const WallpaperGallery = dynamic(() => import("@/components/wallpaper"), {
  loading: () => <SectionSkeleton />,
});

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

  // Explicitly preload the Hero LCP image
  if (page.hero?.images?.[0]?.src) {
    // @ts-ignore - ReactDOM.preload is available in React 18.3+/19 but types might lag
    ReactDOM.preload(page.hero.images[0].src, { as: "image", fetchPriority: "high" });
  } else if (page.hero?.image?.src) {
    // @ts-ignore
    ReactDOM.preload(page.hero.image.src, { as: "image", fetchPriority: "high" });
  }

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
