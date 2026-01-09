"use client";

import { useEffect } from "react";

/**
 * Performance Optimizer Component
 * 
 * This component implements various performance optimizations:
 * 1. Prefetches critical resources during idle time
 * 2. Lazy loads non-critical CSS
 * 3. Implements connection warming for external resources
 */
export default function PerformanceOptimizer() {
    useEffect(() => {
        // Only run in production to avoid dev mode issues
        if (process.env.NODE_ENV !== "production") return;

        // Use requestIdleCallback for non-critical work
        const scheduleWork = (callback: () => void) => {
            if ("requestIdleCallback" in window) {
                requestIdleCallback(callback, { timeout: 2000 });
            } else {
                setTimeout(callback, 200);
            }
        };

        // Prefetch key API routes during idle time
        scheduleWork(() => {
            const prefetchRoutes = [
                "/api/posts/slugs",
            ];

            prefetchRoutes.forEach((route) => {
                const link = document.createElement("link");
                link.rel = "prefetch";
                link.href = route;
                link.as = "fetch";
                link.crossOrigin = "anonymous";
                document.head.appendChild(link);
            });
        });

        // Warm up connections to external resources
        scheduleWork(() => {
            const externalHosts = [
                "https://replicate.delivery",
                "https://replicate.com",
            ];

            externalHosts.forEach((host) => {
                const link = document.createElement("link");
                link.rel = "preconnect";
                link.href = host;
                link.crossOrigin = "anonymous";
                document.head.appendChild(link);
            });
        });

        // Monitor and log Core Web Vitals in production
        if (typeof window !== "undefined" && "performance" in window) {
            // Log LCP (Largest Contentful Paint)
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.debug("[Performance] LCP:", lastEntry.startTime.toFixed(0), "ms");
            });

            try {
                lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
            } catch (e) {
                // LCP observer not supported
            }

            // Log FID (First Input Delay)
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach((entry: any) => {
                    console.debug("[Performance] FID:", entry.processingStart - entry.startTime, "ms");
                });
            });

            try {
                fidObserver.observe({ type: "first-input", buffered: true });
            } catch (e) {
                // FID observer not supported
            }

            // Log CLS (Cumulative Layout Shift)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries() as any[]) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                console.debug("[Performance] CLS:", clsValue.toFixed(4));
            });

            try {
                clsObserver.observe({ type: "layout-shift", buffered: true });
            } catch (e) {
                // CLS observer not supported
            }
        }
    }, []);

    return null;
}
