import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { parse } from "parse5";

const skipped = new Set(["script", "style", "template", "svg", "nav", "iframe", "button", "select"]);
const clean = (text) => text.replace(/\s+/g, " ").trim();
const attribute = (node, name) => node.attrs?.find((attr) => attr.name === name)?.value;
const children = (node) => node.childNodes ?? [];
const ignored = (node) => skipped.has(node.tagName) || attribute(node, "aria-hidden") === "true";
const text = (node) => ignored(node) ? "" : node.value ?? children(node).map(text).join(" ");

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of children(node)) {
    const match = find(child, predicate);
    if (match) return match;
  }
}

function indexPage(html, url) {
  const root = parse(html);
  const main = find(root, (node) => attribute(node, "id") === "main-content");
  if (!main) return;
  const heading = find(main, (node) => node.tagName === "h1");
  if (!heading) return;
  const title = clean(text(heading));
  const sections = [];
  const records = [{ url, title, heading: "", parts: [] }];
  let current = records[0];

  function visit(node) {
    if (ignored(node)) return;
    if (node.tagName === "h2" && attribute(node, "id")) {
      const id = attribute(node, "data-section-target") ?? attribute(node, "id");
      const heading = clean(text(node));
      sections.push({ id, label: heading });
      current = { url: `${url}#${id}`, title, heading, parts: [] };
      records.push(current);
      return;
    }
    if (node.value) current.parts.push(node.value);
    for (const child of children(node)) visit(child);
  }

  visit(main);
  return { sections, records: records.map(({ parts, ...record }) => ({ ...record, body: clean(parts.join(" ")) })) };
}

export default function siteIndex() {
  return {
    name: "site-index",
    hooks: {
      "astro:build:done": async ({ dir, pages }) => {
        const output = fileURLToPath(dir);
        const indexes = { en: [], it: [] };
        const navigation = {};
        for (const { pathname } of pages) {
          const path = pathname.replace(/^\/+|\/+$/g, "");
          if (path === "404" || path.endsWith(".html")) continue;
          const url = path ? `/${path}/` : "/";
          const html = await readFile(join(output, path, "index.html"), "utf8");
          const page = indexPage(html, url);
          if (!page) continue;
          indexes[path === "it" || path.startsWith("it/") ? "it" : "en"].push(...page.records);
          if (page.sections.length > 1) navigation[url] = page.sections;
        }

        const folder = join(output, "site-index");
        await mkdir(folder, { recursive: true });
        await Promise.all([
          writeFile(join(folder, "navigation.json"), JSON.stringify(navigation)),
          ...Object.entries(indexes).map(([locale, records]) =>
            writeFile(join(folder, `search-${locale}.json`), JSON.stringify(records))
          ),
        ]);
      },
    },
  };
}
