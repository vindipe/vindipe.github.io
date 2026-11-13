import { defineConfig } from "astro/config";
// import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import siteIndex from "./scripts/site-index.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://vindipe.github.io",
  integrations: [sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", it: "it" } } }), tailwind(), siteIndex()],
});