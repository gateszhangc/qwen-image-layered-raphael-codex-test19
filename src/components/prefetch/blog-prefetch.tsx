"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

type BlogPrefetchProps = {
  locale: string;
  prefetchLimit?: number;
};

const DEFAULT_PREFETCH_LIMIT = 8;
const FALLBACK_DELAY_MS = 1200;

export default function BlogPrefetch({
  locale,
  prefetchLimit = DEFAULT_PREFETCH_LIMIT,
}: BlogPrefetchProps) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    let idleId: number | null = null;
    let timeoutId: number | null = null;

    const postsPath = locale === "en" ? "/posts" : `/${locale}/posts`;

    const runPrefetch = async () => {
      if (cancelled) return;

      router.prefetch(postsPath);

      try {
        const response = await fetch(
          `/api/posts/slugs?locale=${encodeURIComponent(locale)}`,
          { cache: "force-cache" }
        );

        if (!response.ok || cancelled) return;

        const data = (await response.json()) as { slugs?: string[] };
        const slugs = Array.isArray(data?.slugs) ? data.slugs : [];

        slugs.slice(0, prefetchLimit).forEach((slug) => {
          router.prefetch(`${postsPath}/${slug}`);
        });
      } catch (error) {
        console.warn("[BlogPrefetch] Failed to prefetch blog posts", error);
      }
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(
          () => {
            runPrefetch();
          },
          { timeout: 3000 }
        );
      } else {
        timeoutId = window.setTimeout(() => {
          runPrefetch();
        }, FALLBACK_DELAY_MS);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      const onLoad = () => schedule();
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        cancelled = true;
        window.removeEventListener("load", onLoad);
        if (idleId !== null) window.cancelIdleCallback(idleId);
        if (timeoutId !== null) window.clearTimeout(timeoutId);
      };
    }

    return () => {
      cancelled = true;
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [locale, prefetchLimit, router]);

  return null;
}
