import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { truncateForMeta } from "../src/hooks/useSEO.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

const SITE_URL = "https://razsadnik-zvezda.app";
const SITE_NAME = "Разсадник Звезди";

const products = JSON.parse(readFileSync(path.join(root, "src/data/products.json"), "utf-8"));
const guides = JSON.parse(readFileSync(path.join(root, "src/data/guides.json"), "utf-8"));

const template = readFileSync(path.join(distDir, "index.html"), "utf-8");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function encodeImagePath(image) {
  return image
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function renderPage({ title, description, path: routePath, image }) {
  const url = `${SITE_URL}${routePath}`;
  const absImage = image ? `${SITE_URL}${encodeImagePath(image)}` : `${SITE_URL}/images/header.jpg`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDescription}" />`,
  );
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${safeDescription}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${absImage}" />`,
  );
  html = html.replace(/\s*<meta\s+property="og:image:width"[^>]*\/>/, "");
  html = html.replace(/\s*<meta\s+property="og:image:height"[^>]*\/>/, "");
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDescription}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${absImage}" />`,
  );

  return html;
}

function writeSnapshot(routePath, html) {
  const dir = path.join(distDir, routePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html, "utf-8");
}

let count = 0;

for (const product of products.filter((item) => item.available)) {
  const html = renderPage({
    title: `${product.title} - ${product.subtitle} | ${SITE_NAME}`,
    description: truncateForMeta(product.description),
    path: `/product/${product.id}`,
    image: product.image,
  });
  writeSnapshot(`product/${product.id}`, html);
  count += 1;
}

for (const guide of guides) {
  const html = renderPage({
    title: `${guide.title} | ${SITE_NAME}`,
    description: guide.excerpt,
    path: `/guide/${guide.slug}`,
    image: guide.image,
  });
  writeSnapshot(`guide/${guide.slug}`, html);
  count += 1;
}

console.log(`Generated ${count} static SEO snapshots`);
