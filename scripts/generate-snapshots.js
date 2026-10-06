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

function renderPage({ title, description, path: routePath, image, structuredData = [] }) {
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

  if (structuredData.length > 0) {
    const scripts = structuredData
      .map((schema) => `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join("\n");
    html = html.replace("</head>", `${scripts}\n  </head>`);
  }

  return html;
}

function buildProductSchema(product) {
  const url = `${SITE_URL}/product/${product.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: truncateForMeta(product.description, 500),
    image: `${SITE_URL}${encodeImagePath(product.image)}`,
    sku: product.id,
    category: product.category,
    url,
    brand: { "@type": "Brand", name: SITE_NAME + " Овчаров" },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "EUR",
      price: product.price,
      availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

function buildProductBreadcrumbSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Начало", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: product.category, item: `${SITE_URL}/#products` },
      { "@type": "ListItem", position: 3, name: product.title, item: `${SITE_URL}/product/${product.id}` },
    ],
  };
}

function buildGuideSchema(guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    image: `${SITE_URL}${encodeImagePath(guide.image)}`,
    author: { "@type": "Organization", name: SITE_NAME + " Овчаров" },
    publisher: { "@type": "Organization", name: SITE_NAME + " Овчаров" },
    mainEntityOfPage: `${SITE_URL}/guide/${guide.slug}`,
  };
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
    structuredData: [buildProductSchema(product), buildProductBreadcrumbSchema(product)],
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
    structuredData: [buildGuideSchema(guide)],
  });
  writeSnapshot(`guide/${guide.slug}`, html);
  count += 1;
}

console.log(`Generated ${count} static SEO snapshots`);
