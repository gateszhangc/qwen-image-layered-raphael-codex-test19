"use client";


import { useEffect, useState } from "react";
import NextImage from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HappyUsers from "./happy-users";
import HeroBg from "./bg";
import { Hero as HeroType } from "@/types/blocks/hero";
import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function Hero({ hero }: { hero: HeroType }) {
  if (hero.disabled) {
    return null;
  }

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [carouselCount, setCarouselCount] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const highlightText = hero.highlight_text;
  let texts = null;
  if (highlightText) {
    texts = hero.title?.split(highlightText, 2);
  }

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateState = () => {
      setCarouselCount(carouselApi.scrollSnapList().length);
      setCarouselIndex(carouselApi.selectedScrollSnap());
    };

    updateState();
    carouselApi.on("select", updateState);
    carouselApi.on("reInit", updateState);

    return () => {
      carouselApi.off("select", updateState);
      carouselApi.off("reInit", updateState);
    };
  }, [carouselApi]);

  return (
    <>
      <section className="landing-hero relative">
        <HeroBg />
        <div className="container relative z-10">
          {hero.show_badge && (
            <div className="landing-reveal landing-reveal--1 mb-8 flex items-center justify-center lg:justify-start">
              <img
                src="/imgs/badges/phdaily.svg"
                alt="phdaily"
                className="h-10 object-cover"
              />
            </div>
          )}
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="text-center lg:text-left">
              {hero.announcement && (
                <Link
                  href={hero.announcement.url as any}
                  className="landing-hero-chip landing-reveal landing-reveal--2 mx-auto mb-3 inline-flex items-center gap-3 px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground lg:mx-0"
                >
                  {hero.announcement.label && (
                    <Badge
                      variant="outline"
                      className="landing-hero-badge bg-primary/20 text-primary border-primary/40"
                    >
                      {hero.announcement.label}
                    </Badge>
                  )}
                  {hero.announcement.title}
                </Link>
              )}

              {texts && texts.length > 1 ? (
                <h1 className="landing-title landing-reveal landing-reveal--3 mx-auto mb-4 mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl">
                  {texts[0]}
                  <span className="landing-title-highlight">
                    {highlightText}
                  </span>
                  {texts[1]}
                </h1>
              ) : (
                <h1 className="landing-title landing-reveal landing-reveal--3 mx-auto mb-4 mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl">
                  {hero.title}
                </h1>
              )}

              <p
                className="landing-reveal landing-reveal--4 mx-auto max-w-3xl text-base text-muted-foreground/90 sm:text-lg lg:mx-0 lg:text-xl"
                dangerouslySetInnerHTML={{ __html: hero.description || "" }}
              />
              {hero.buttons && (
                <div className="landing-hero-actions landing-reveal landing-reveal--5 mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  {hero.buttons.map((item, i) => {
                    return (
                      <Link
                        key={i}
                        href={item.url as any}
                        target={item.target || ""}
                        className="flex items-center"
                      >
                        <Button
                          className="landing-hero-button w-full px-8"
                          size="lg"
                          variant={item.variant || "default"}
                        >
                          {item.icon && <Icon name={item.icon} className="" />}
                          {item.title}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              )}
              {hero.features && hero.features.length > 0 && (
                <div className="landing-reveal landing-reveal--6 mt-8 grid gap-3 text-left text-sm text-muted-foreground sm:grid-cols-2">
                  {hero.features.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="inline-flex size-5 items-center justify-center rounded-full border border-primary/40 text-primary">
                        <Icon name="RiCheckLine" className="size-3" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {hero.tip && (
                <p className="landing-reveal landing-reveal--6 mt-8 text-sm text-muted-foreground/80">
                  {hero.tip}
                </p>
              )}
              {hero.show_happy_users && <HappyUsers />}
            </div>
            <div className="landing-reveal landing-reveal--4 flex justify-center lg:justify-end">
              {hero.images && hero.images.length > 0 ? (
                <div className="relative w-full max-w-lg">
                  <div className="group relative overflow-hidden rounded-[32px] border border-border/70 bg-card/70 shadow-2xl backdrop-blur">
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      setApi={setCarouselApi}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-0">
                        {hero.images.map((img, index) => (
                          <CarouselItem key={index} className="pl-0">
                            <div className="relative aspect-[4/3] w-full">
                              <NextImage
                                src={img.src}
                                alt={img.alt || `Hero preview ${index + 1}`}
                                fill
                                className="rounded-2xl object-contain bg-muted/30"
                                priority={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 512px"
                                unoptimized
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious
                        variant="secondary"
                        className="absolute left-5 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/65 group-hover:opacity-100"
                      />
                      <CarouselNext
                        variant="secondary"
                        className="absolute right-5 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/65 group-hover:opacity-100"
                      />
                      {carouselCount > 1 && (
                        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 backdrop-blur">
                          {Array.from({ length: carouselCount }).map(
                            (_, index) => (
                              <button
                                key={index}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => carouselApi?.scrollTo(index)}
                                className={cn(
                                  "h-2 w-2 rounded-full transition",
                                  index === carouselIndex
                                    ? "bg-white"
                                    : "bg-white/40 hover:bg-white/70"
                                )}
                              />
                            )
                          )}
                        </div>
                      )}
                    </Carousel>
                  </div>
                </div>
              ) : (
                hero.image?.src && (
                  <div className="relative w-full max-w-lg">
                    <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/70 shadow-2xl backdrop-blur">
                      <div className="relative aspect-[4/3] w-full">
                        <NextImage
                          src={hero.image.src}
                          alt={hero.image.alt || "Hero preview"}
                          fill
                          className="rounded-2xl object-contain bg-muted/30"
                          priority
                          loading="eager"
                          fetchPriority="high"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 512px"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div >
      </section >
    </>
  );
}
