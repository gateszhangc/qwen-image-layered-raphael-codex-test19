import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const PAGE_NAMESPACES = [
  "landing",
  "pricing",
  "showcase",
  "font-recognizer",
  "image-flip-generator",
  "blog",
];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  if (["zh-CN"].includes(locale)) {
    locale = "zh";
  }

  if (!routing.locales.includes(locale as any)) {
    locale = "en";
  }

  try {
    const baseMessages = (
      await import(`./messages/${locale.toLowerCase()}.json`)
    ).default;

    // Merge in page-level namespaces so components can resolve translations.
    const pageMessages = await Promise.allSettled(
      PAGE_NAMESPACES.map((ns) =>
        import(`./pages/${ns}/${locale.toLowerCase()}.json`)
      )
    );

    const mergedPageMessages = pageMessages.reduce((acc, result) => {
      if (result.status === "fulfilled") {
        return { ...acc, ...result.value.default };
      }
      return acc;
    }, {});

    const messages = { ...baseMessages, ...mergedPageMessages };

    return {
      locale: locale,
      messages: messages,
    };
  } catch (e) {
    return {
      locale: "en",
      messages: {
        ...(await import(`./messages/en.json`)).default,
        ...(await import("./pages/landing/en.json")).default,
        ...(await import("./pages/pricing/en.json")).default,
        ...(await import("./pages/showcase/en.json")).default,
        ...(await import("./pages/font-recognizer/en.json")).default,
        ...(await import("./pages/image-flip-generator/en.json")).default,
        ...(await import("./pages/blog/en.json")).default,
      },
    };
  }
});
