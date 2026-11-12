export type Locale = "en" | "it";

export function getLocale(pathname: string): Locale {
  return pathname === "/it" || pathname.startsWith("/it/") ? "it" : "en";
}

const pagePath = /^\/(?:$|(?:projects|research|tutorials|cv|contact|privacy)(?:\/[a-z0-9-]+)?\/?$)/;

export function inLanguage(href: string, locale: Locale): string {
  const [pathname] = href.split(/[?#]/, 1);
  const englishPath = pathname.replace(/^\/it(?=\/|$)/, "") || "/";
  if (!pagePath.test(englishPath)) return href;

  const suffix = href.slice(pathname.length);
  const path = englishPath.endsWith("/") ? englishPath : englishPath + "/";
  return (locale === "it" ? "/it" : "") + path + suffix;
}

export function translator(pathname: string) {
  const italian = getLocale(pathname) === "it";
  return (english: string, translation: string) => italian ? translation : english;
}
