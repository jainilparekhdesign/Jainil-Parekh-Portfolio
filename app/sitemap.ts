import type { MetadataRoute } from "next";

const ROUTES = [
  "/",
  "/projects",
  "/projects/read",
  "/projects/ai-research",
  "/projects/read-validation",
  "/resume",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jainilparekh.design";
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified,
  }));
}
