import guidesData from "./guides.json";

export const guides = guidesData;

export function getGuideBySlug(slug) {
  return guides.find((guide) => guide.slug === slug);
}
