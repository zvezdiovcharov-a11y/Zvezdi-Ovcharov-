import { useEffect } from "react";

const SITE_URL = "https://razsadnik-zvezda.app";
const DEFAULT_IMAGE = `${SITE_URL}/images/header.jpg`;

function setMetaByAttr(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function truncateForMeta(text, maxLength = 160) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function useSEO({ title, description, path, image, noindex = false }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const resolvedImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

    document.title = title;
    setMetaByAttr("name", "description", description);
    setMetaByAttr("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");

    setMetaByAttr("property", "og:title", title);
    setMetaByAttr("property", "og:description", description);
    setMetaByAttr("property", "og:image", resolvedImage);
    setMetaByAttr("property", "og:url", url);

    setMetaByAttr("name", "twitter:title", title);
    setMetaByAttr("name", "twitter:description", description);
    setMetaByAttr("name", "twitter:image", resolvedImage);

    setCanonical(url);
  }, [title, description, path, image, noindex]);
}
