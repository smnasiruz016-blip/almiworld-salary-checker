import type { MetadataRoute } from "next";
import { getAllLandingParams } from "@/lib/landing-page-data";

const SITE_URL = "https://almisalary.almiworld.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/`,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const landingEntries = getAllLandingParams().map((p) => ({
    url: `${SITE_URL}/salary/${p.country}/${p.role}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [homeEntry, ...landingEntries];
}
