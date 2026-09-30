import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SITE_URL = "https://razsadnik-zvezda.app";
const today = new Date().toISOString().slice(0, 10);

const products = JSON.parse(readFileSync(path.join(root, "src/data/products.json"), "utf-8"));
const guides = JSON.parse(readFileSync(path.join(root, "src/data/guides.json"), "utf-8"));

const staticUrls = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/gallery", changefreq: "monthly", priority: "0.5" },
  { loc: "/obshti-uslovia", changefreq: "yearly", priority: "0.2" },
  { loc: "/politika-za-poveritelnost", changefreq: "yearly", priority: "0.2" },
];

const productUrls = products
  .filter((product) => product.available)
  .map((product) => ({ loc: `/product/${product.id}`, changefreq: "weekly", priority: "0.8" }));

const guideUrls = guides.map((guide) => ({ loc: `/guide/${guide.slug}`, changefreq: "monthly", priority: "0.6" }));

const allUrls = [...staticUrls, ...productUrls, ...guideUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(path.join(root, "public/sitemap.xml"), xml, "utf-8");
console.log(`sitemap.xml generated with ${allUrls.length} URLs`);
