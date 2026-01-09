"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales } from "@/i18n/locale";

type LandingThemeProps = {
  children: ReactNode;
  className?: string;
};

const isLandingPath = (pathname: string | null) => {
  if (!pathname) return false;
  const normalized = pathname.replace(/\/$/, "");
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return true;
  const firstSegment = segments[0];
  const hasLocalePrefix = locales.includes(firstSegment);
  if (segments.length === 1 && hasLocalePrefix) return true;
  const contentSegments = hasLocalePrefix ? segments.slice(1) : segments;
  if (contentSegments.length === 0) return true;
  if (contentSegments[0] === "posts") return true;
  return false;
};

export default function LandingTheme({ children, className }: LandingThemeProps) {
  const pathname = usePathname();
  const isLanding = isLandingPath(pathname);

  return (
    <div
      className={cn(
        isLanding ? "landing-raphael dark" : "",
        isLanding ? className : ""
      )}
    >
      {children}
    </div>
  );
}
